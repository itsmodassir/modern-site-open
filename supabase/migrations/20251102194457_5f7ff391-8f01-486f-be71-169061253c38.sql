-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'site_manager', 'cash_manager', 'fund_manager');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Sites/Projects table
CREATE TABLE public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on_hold')),
  budget DECIMAL(15,2),
  start_date DATE,
  end_date DATE,
  site_manager_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Employees table with auto-generated employee_id
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  department_id UUID REFERENCES public.departments(id),
  designation TEXT NOT NULL,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  site_id UUID REFERENCES public.sites(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Function to auto-generate employee ID
CREATE OR REPLACE FUNCTION public.generate_employee_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_id TEXT;
BEGIN
  -- Get the next sequence number
  SELECT COALESCE(MAX(CAST(SUBSTRING(employee_id FROM 4) AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.employees
  WHERE employee_id ~ '^EMP[0-9]+$';
  
  -- Generate new employee ID with padding
  new_id := 'EMP' || LPAD(next_num::TEXT, 5, '0');
  
  NEW.employee_id := new_id;
  RETURN NEW;
END;
$$;

-- Trigger for auto-generating employee_id
CREATE TRIGGER set_employee_id
BEFORE INSERT ON public.employees
FOR EACH ROW
WHEN (NEW.employee_id IS NULL)
EXECUTE FUNCTION public.generate_employee_id();

-- Salary structure table
CREATE TABLE public.salary_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  basic_salary DECIMAL(12,2) NOT NULL,
  hra DECIMAL(12,2) DEFAULT 0,
  transport_allowance DECIMAL(12,2) DEFAULT 0,
  other_allowances DECIMAL(12,2) DEFAULT 0,
  effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.salary_structure ENABLE ROW LEVEL SECURITY;

-- Attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half_day', 'leave', 'holiday')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Salary payments table
CREATE TABLE public.salary_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  basic_salary DECIMAL(12,2) NOT NULL,
  allowances DECIMAL(12,2) DEFAULT 0,
  gross_salary DECIMAL(12,2) NOT NULL,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_salary DECIMAL(12,2) NOT NULL,
  working_days INTEGER NOT NULL,
  present_days INTEGER NOT NULL,
  absent_days INTEGER DEFAULT 0,
  paid_on DATE,
  payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'cheque')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, month, year)
);

ALTER TABLE public.salary_payments ENABLE ROW LEVEL SECURITY;

-- Expense categories table
CREATE TABLE public.expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;

-- Expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id),
  category_id UUID REFERENCES public.expense_categories(id) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'cheque')),
  receipt_url TEXT,
  approved_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Bills table
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_number TEXT UNIQUE NOT NULL,
  site_id UUID REFERENCES public.sites(id),
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  bill_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'partially_paid', 'cancelled')),
  paid_amount DECIMAL(15,2) DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Function to auto-generate bill number
CREATE OR REPLACE FUNCTION public.generate_bill_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_bill_num TEXT;
  year_suffix TEXT;
BEGIN
  year_suffix := TO_CHAR(CURRENT_DATE, 'YY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(bill_number FROM 8) AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.bills
  WHERE bill_number ~ ('^BILL' || year_suffix || '[0-9]+$');
  
  new_bill_num := 'BILL' || year_suffix || LPAD(next_num::TEXT, 5, '0');
  
  NEW.bill_number := new_bill_num;
  RETURN NEW;
END;
$$;

-- Trigger for auto-generating bill number
CREATE TRIGGER set_bill_number
BEFORE INSERT ON public.bills
FOR EACH ROW
WHEN (NEW.bill_number IS NULL OR NEW.bill_number = '')
EXECUTE FUNCTION public.generate_bill_number();

-- Fund allocations table
CREATE TABLE public.fund_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id),
  amount DECIMAL(15,2) NOT NULL,
  allocation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  purpose TEXT NOT NULL,
  allocated_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'allocated' CHECK (status IN ('allocated', 'utilized', 'returned')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.fund_allocations ENABLE ROW LEVEL SECURITY;

-- Work progress table
CREATE TABLE public.work_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) NOT NULL,
  task_name TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.employees(id),
  start_date DATE,
  end_date DATE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'on_hold')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.work_progress ENABLE ROW LEVEL SECURITY;

-- Updated timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_work_progress_updated_at
BEFORE UPDATE ON public.work_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- RLS Policies

-- User roles policies
CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Departments policies
CREATE POLICY "Everyone can view departments"
ON public.departments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage departments"
ON public.departments FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager')
);

-- Sites policies
CREATE POLICY "Authenticated users can view sites"
ON public.sites FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage sites"
ON public.sites FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager')
);

-- Employees policies
CREATE POLICY "Authenticated users can view employees"
ON public.employees FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage employees"
ON public.employees FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager')
);

-- Salary structure policies
CREATE POLICY "Admins and managers can view salary structures"
ON public.salary_structure FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'cash_manager')
);

CREATE POLICY "Admins and managers can manage salary structures"
ON public.salary_structure FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager')
);

-- Attendance policies
CREATE POLICY "Authenticated users can view attendance"
ON public.attendance FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins, managers, and site managers can manage attendance"
ON public.attendance FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'site_manager')
);

-- Salary payments policies
CREATE POLICY "Admins and cash managers can view salary payments"
ON public.salary_payments FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'cash_manager')
);

CREATE POLICY "Admins and cash managers can manage salary payments"
ON public.salary_payments FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'cash_manager')
);

-- Expense categories policies
CREATE POLICY "Authenticated users can view expense categories"
ON public.expense_categories FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage expense categories"
ON public.expense_categories FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager')
);

-- Expenses policies
CREATE POLICY "Authenticated users can view expenses"
ON public.expenses FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create expenses"
ON public.expenses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins and managers can manage all expenses"
ON public.expenses FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'cash_manager')
);

-- Bills policies
CREATE POLICY "Authenticated users can view bills"
ON public.bills FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and managers can manage bills"
ON public.bills FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'cash_manager')
);

-- Fund allocations policies
CREATE POLICY "Authenticated users can view fund allocations"
ON public.fund_allocations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and fund managers can manage fund allocations"
ON public.fund_allocations FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'fund_manager')
);

-- Work progress policies
CREATE POLICY "Authenticated users can view work progress"
ON public.work_progress FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins, managers, and site managers can manage work progress"
ON public.work_progress FOR ALL
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'manager') OR
  public.has_role(auth.uid(), 'site_manager')
);