-- Add display_name column to user_roles table
ALTER TABLE public.user_roles 
ADD COLUMN display_name TEXT;

-- Update existing admin role with display name
UPDATE public.user_roles 
SET display_name = 'admin' 
WHERE role = 'admin';