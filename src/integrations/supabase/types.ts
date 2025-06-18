export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      benchmark_data: {
        Row: {
          benchmark_value: number | null
          company_size: string | null
          created_at: string | null
          id: string
          industry: string
          metric_name: string
          percentile: number | null
          source: string | null
          unit: string | null
          year: number | null
        }
        Insert: {
          benchmark_value?: number | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry: string
          metric_name: string
          percentile?: number | null
          source?: string | null
          unit?: string | null
          year?: number | null
        }
        Update: {
          benchmark_value?: number | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry?: string
          metric_name?: string
          percentile?: number | null
          source?: string | null
          unit?: string | null
          year?: number | null
        }
        Relationships: []
      }
      carbon_footprint_details: {
        Row: {
          activity_data: number | null
          calculation_method: string | null
          category: string | null
          company_id: string | null
          created_at: string | null
          emission_factor: number | null
          emissions_co2_tons: number | null
          id: string
          reporting_period: string | null
          scope: number | null
          source_description: string | null
          unit: string | null
          verified: boolean | null
        }
        Insert: {
          activity_data?: number | null
          calculation_method?: string | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          emission_factor?: number | null
          emissions_co2_tons?: number | null
          id?: string
          reporting_period?: string | null
          scope?: number | null
          source_description?: string | null
          unit?: string | null
          verified?: boolean | null
        }
        Update: {
          activity_data?: number | null
          calculation_method?: string | null
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          emission_factor?: number | null
          emissions_co2_tons?: number | null
          id?: string
          reporting_period?: string | null
          scope?: number | null
          source_description?: string | null
          unit?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "carbon_footprint_details_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          description: string | null
          headquarters_location: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          size: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          headquarters_location?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          size?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          headquarters_location?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          size?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      dashboard_configurations: {
        Row: {
          configuration_name: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          layout_config: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          configuration_name?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          layout_config?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          configuration_name?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          layout_config?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_configurations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          connection_config: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          last_sync: string | null
          name: string
          type: Database["public"]["Enums"]["data_source_type"]
          updated_at: string | null
        }
        Insert: {
          connection_config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name: string
          type: Database["public"]["Enums"]["data_source_type"]
          updated_at?: string | null
        }
        Update: {
          connection_config?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name?: string
          type?: Database["public"]["Enums"]["data_source_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_engagement: {
        Row: {
          category: string | null
          company_id: string | null
          created_at: string | null
          department: string | null
          id: string
          metric_name: string
          reporting_period: string | null
          target_value: number | null
          unit: string | null
          value: number | null
        }
        Insert: {
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          metric_name: string
          reporting_period?: string | null
          target_value?: number | null
          unit?: string | null
          value?: number | null
        }
        Update: {
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          metric_name?: string
          reporting_period?: string | null
          target_value?: number | null
          unit?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_engagement_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_consumption: {
        Row: {
          company_id: string | null
          consumption_kwh: number | null
          cost: number | null
          created_at: string | null
          currency: string | null
          energy_type: string | null
          facility_name: string | null
          id: string
          reporting_period: string | null
          source: string | null
        }
        Insert: {
          company_id?: string | null
          consumption_kwh?: number | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          energy_type?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          source?: string | null
        }
        Update: {
          company_id?: string | null
          consumption_kwh?: number | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          energy_type?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "energy_consumption_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      environmental_data: {
        Row: {
          created_at: string | null
          id: number
          metric_name: string | null
          month: string | null
          region: string | null
          value: number | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          id: number
          metric_name?: string | null
          month?: string | null
          region?: string | null
          value?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          metric_name?: string | null
          month?: string | null
          region?: string | null
          value?: number | null
          year?: number | null
        }
        Relationships: []
      }
      esg_milestones: {
        Row: {
          completion_date: string | null
          created_at: string | null
          current_value: number | null
          id: number
          milestone_name: string | null
          target_value: number | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          current_value?: number | null
          id: number
          milestone_name?: string | null
          target_value?: number | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          current_value?: number | null
          id?: number
          milestone_name?: string | null
          target_value?: number | null
        }
        Relationships: []
      }
      esg_scores: {
        Row: {
          category: string
          created_at: string | null
          id: number
          metric_detail: string | null
          score: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id: number
          metric_detail?: string | null
          score?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: number
          metric_detail?: string | null
          score?: number | null
        }
        Relationships: []
      }
      esg_targets: {
        Row: {
          category: string
          company_id: string | null
          created_at: string | null
          current_value: number | null
          description: string | null
          id: string
          is_active: boolean | null
          metric_name: string
          target_date: string | null
          target_value: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string | null
          current_value?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metric_name: string
          target_date?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string | null
          current_value?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          metric_name?: string
          target_date?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "esg_targets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      governance_metrics: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          metric_name: string | null
          month: string | null
          value: number | null
          year: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id: number
          metric_name?: string | null
          month?: string | null
          value?: number | null
          year?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: number
          metric_name?: string | null
          month?: string | null
          value?: number | null
          year?: number | null
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          frequency: string | null
          id: string
          notification_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          frequency?: string | null
          id?: string
          notification_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          frequency?: string | null
          id?: string
          notification_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      report_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          template_config: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          template_config?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          template_config?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_metrics: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          metric_name: string | null
          month: string | null
          value: number | null
          year: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id: number
          metric_name?: string | null
          month?: string | null
          value?: number | null
          year?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: number
          metric_name?: string | null
          month?: string | null
          value?: number | null
          year?: number | null
        }
        Relationships: []
      }
      supply_chain_metrics: {
        Row: {
          certification_status: string | null
          company_id: string | null
          created_at: string | null
          environmental_score: number | null
          esg_score: number | null
          governance_score: number | null
          id: string
          last_audit_date: string | null
          next_audit_date: string | null
          social_score: number | null
          supplier_category: string | null
          supplier_name: string
          updated_at: string | null
        }
        Insert: {
          certification_status?: string | null
          company_id?: string | null
          created_at?: string | null
          environmental_score?: number | null
          esg_score?: number | null
          governance_score?: number | null
          id?: string
          last_audit_date?: string | null
          next_audit_date?: string | null
          social_score?: number | null
          supplier_category?: string | null
          supplier_name: string
          updated_at?: string | null
        }
        Update: {
          certification_status?: string | null
          company_id?: string | null
          created_at?: string | null
          environmental_score?: number | null
          esg_score?: number | null
          governance_score?: number | null
          id?: string
          last_audit_date?: string | null
          next_audit_date?: string | null
          social_score?: number | null
          supplier_category?: string | null
          supplier_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_metrics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sustainability_reports: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          file_url: string | null
          id: string
          report_type: string | null
          reporting_period_end: string | null
          reporting_period_start: string | null
          status: Database["public"]["Enums"]["report_status"] | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          file_url?: string | null
          id?: string
          report_type?: string | null
          reporting_period_end?: string | null
          reporting_period_start?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          file_url?: string | null
          id?: string
          report_type?: string | null
          reporting_period_end?: string | null
          reporting_period_start?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sustainability_reports_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sustainability_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_company_access: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_company_access_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_access_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_records: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          record_id: string
          status: Database["public"]["Enums"]["verification_status"] | null
          table_name: string
          verification_date: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          record_id: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          table_name: string
          verification_date?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          record_id?: string
          status?: Database["public"]["Enums"]["verification_status"] | null
          table_name?: string
          verification_date?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_records_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_management_data: {
        Row: {
          amount_kg: number | null
          company_id: string | null
          cost: number | null
          created_at: string | null
          currency: string | null
          disposal_method: string | null
          facility_name: string | null
          id: string
          reporting_period: string | null
          waste_category: string | null
          waste_type: string | null
        }
        Insert: {
          amount_kg?: number | null
          company_id?: string | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          disposal_method?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          waste_category?: string | null
          waste_type?: string | null
        }
        Update: {
          amount_kg?: number | null
          company_id?: string | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          disposal_method?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          waste_category?: string | null
          waste_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waste_management_data_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      water_usage_details: {
        Row: {
          company_id: string | null
          consumption_liters: number | null
          cost: number | null
          created_at: string | null
          currency: string | null
          facility_name: string | null
          id: string
          reporting_period: string | null
          source: string | null
          usage_type: string | null
        }
        Insert: {
          company_id?: string | null
          consumption_liters?: number | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          source?: string | null
          usage_type?: string | null
        }
        Update: {
          company_id?: string | null
          consumption_liters?: number | null
          cost?: number | null
          created_at?: string | null
          currency?: string | null
          facility_name?: string | null
          id?: string
          reporting_period?: string | null
          source?: string | null
          usage_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "water_usage_details_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
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
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "viewer"
      data_source_type: "manual" | "api" | "file_upload" | "sensor"
      report_status: "draft" | "published" | "archived"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "viewer"],
      data_source_type: ["manual", "api", "file_upload", "sensor"],
      report_status: ["draft", "published", "archived"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
