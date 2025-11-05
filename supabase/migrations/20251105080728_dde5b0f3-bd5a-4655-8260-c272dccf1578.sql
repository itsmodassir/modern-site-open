-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  client TEXT,
  location TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  start_date DATE,
  completion_date DATE,
  budget NUMERIC,
  area TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view active projects
CREATE POLICY "Anyone can view active projects"
ON public.projects
FOR SELECT
USING (status = 'active');

-- Admins and managers can manage projects
CREATE POLICY "Admins and managers can manage projects"
ON public.projects
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));