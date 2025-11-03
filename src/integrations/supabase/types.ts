export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          notes: string | null
          status: string | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date: string
          employee_id: string
          id?: string
          notes?: string | null
          status?: string | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          amount: number
          bill_date: string
          bill_number: string
          client_email: string | null
          client_name: string
          client_phone: string | null
          created_at: string | null
          created_by: string | null
          description: string
          due_date: string | null
          id: string
          paid_amount: number | null
          site_id: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
        }
        Insert: {
          amount: number
          bill_date?: string
          bill_number: string
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          due_date?: string | null
          id?: string
          paid_amount?: number | null
          site_id?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
        }
        Update: {
          amount?: number
          bill_date?: string
          bill_number?: string
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          due_date?: string | null
          id?: string
          paid_amount?: number | null
          site_id?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bills_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          address: string | null
          created_at: string | null
          department_id: string | null
          designation: string
          email: string | null
          employee_id: string
          full_name: string
          id: string
          join_date: string
          phone: string | null
          site_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          department_id?: string | null
          designation: string
          email?: string | null
          employee_id: string
          full_name: string
          id?: string
          join_date?: string
          phone?: string | null
          site_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          department_id?: string | null
          designation?: string
          email?: string | null
          employee_id?: string
          full_name?: string
          id?: string
          join_date?: string
          phone?: string | null
          site_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          approved_by: string | null
          category_id: string
          created_at: string | null
          created_by: string | null
          description: string
          expense_date: string
          id: string
          payment_method: string | null
          receipt_url: string | null
          site_id: string | null
          status: string | null
        }
        Insert: {
          amount: number
          approved_by?: string | null
          category_id: string
          created_at?: string | null
          created_by?: string | null
          description: string
          expense_date?: string
          id?: string
          payment_method?: string | null
          receipt_url?: string | null
          site_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          category_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          expense_date?: string
          id?: string
          payment_method?: string | null
          receipt_url?: string | null
          site_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_allocations: {
        Row: {
          allocated_by: string | null
          allocation_date: string
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          purpose: string
          site_id: string | null
          status: string | null
        }
        Insert: {
          allocated_by?: string | null
          allocation_date?: string
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          purpose: string
          site_id?: string | null
          status?: string | null
        }
        Update: {
          allocated_by?: string | null
          allocation_date?: string
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          purpose?: string
          site_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fund_allocations_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_payments: {
        Row: {
          absent_days: number | null
          allowances: number | null
          basic_salary: number
          created_at: string | null
          created_by: string | null
          deductions: number | null
          employee_id: string
          gross_salary: number
          id: string
          month: number
          net_salary: number
          notes: string | null
          paid_on: string | null
          payment_method: string | null
          present_days: number
          status: string | null
          working_days: number
          year: number
        }
        Insert: {
          absent_days?: number | null
          allowances?: number | null
          basic_salary: number
          created_at?: string | null
          created_by?: string | null
          deductions?: number | null
          employee_id: string
          gross_salary: number
          id?: string
          month: number
          net_salary: number
          notes?: string | null
          paid_on?: string | null
          payment_method?: string | null
          present_days: number
          status?: string | null
          working_days: number
          year: number
        }
        Update: {
          absent_days?: number | null
          allowances?: number | null
          basic_salary?: number
          created_at?: string | null
          created_by?: string | null
          deductions?: number | null
          employee_id?: string
          gross_salary?: number
          id?: string
          month?: number
          net_salary?: number
          notes?: string | null
          paid_on?: string | null
          payment_method?: string | null
          present_days?: number
          status?: string | null
          working_days?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "salary_payments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_structure: {
        Row: {
          basic_salary: number
          created_at: string | null
          effective_from: string
          employee_id: string
          hra: number | null
          id: string
          other_allowances: number | null
          transport_allowance: number | null
        }
        Insert: {
          basic_salary: number
          created_at?: string | null
          effective_from?: string
          employee_id: string
          hra?: number | null
          id?: string
          other_allowances?: number | null
          transport_allowance?: number | null
        }
        Update: {
          basic_salary?: number
          created_at?: string | null
          effective_from?: string
          employee_id?: string
          hra?: number | null
          id?: string
          other_allowances?: number | null
          transport_allowance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "salary_structure_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          budget: number | null
          created_at: string | null
          end_date: string | null
          id: string
          location: string
          name: string
          site_manager_id: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          location: string
          name: string
          site_manager_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          location?: string
          name?: string
          site_manager_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      work_progress: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          notes: string | null
          progress_percentage: number | null
          site_id: string
          start_date: string | null
          status: string | null
          task_name: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          site_id: string
          start_date?: string | null
          status?: string | null
          task_name: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          site_id?: string
          start_date?: string | null
          status?: string | null
          task_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_progress_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_progress_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "manager"
        | "site_manager"
        | "cash_manager"
        | "fund_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "manager",
        "site_manager",
        "cash_manager",
        "fund_manager",
      ],
    },
  },
} as const
