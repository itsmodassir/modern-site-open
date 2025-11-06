-- Create company profiles table for saving company information
CREATE TABLE public.company_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  gstin TEXT,
  phone TEXT,
  email TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  upi_id TEXT,
  is_default BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create clients table for saving client information
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  gstin TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service items table for saving common goods/services
CREATE TABLE public.service_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  default_amount NUMERIC,
  category TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for company_profiles
CREATE POLICY "Users can view their own company profiles"
  ON public.company_profiles FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own company profiles"
  ON public.company_profiles FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own company profiles"
  ON public.company_profiles FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own company profiles"
  ON public.company_profiles FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for clients
CREATE POLICY "Users can view their own clients"
  ON public.clients FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own clients"
  ON public.clients FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own clients"
  ON public.clients FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own clients"
  ON public.clients FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for service_items
CREATE POLICY "Users can view their own service items"
  ON public.service_items FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own service items"
  ON public.service_items FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own service items"
  ON public.service_items FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own service items"
  ON public.service_items FOR DELETE
  USING (auth.uid() = created_by);

-- Add triggers for updated_at
CREATE TRIGGER update_company_profiles_updated_at
  BEFORE UPDATE ON public.company_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_service_items_updated_at
  BEFORE UPDATE ON public.service_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();