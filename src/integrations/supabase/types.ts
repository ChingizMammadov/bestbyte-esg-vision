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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
