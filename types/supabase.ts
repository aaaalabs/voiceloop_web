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
      colorkey: {
        Row: {
          color_code: string
          created_at: string | null
          description: string
          updated_at: string | null
        }
        Insert: {
          color_code: string
          created_at?: string | null
          description: string
          updated_at?: string | null
        }
        Update: {
          color_code?: string
          created_at?: string | null
          description?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          content: string | null
          created_at: string | null
          feedback_id: string
          feedback_type: string | null
          highlight: string | null
          is_testimonial: boolean | null
          linkedin_recommendation_clicked: boolean | null
          linkedin_recommendation_url: string | null
          media_url: string | null
          meeting_id: string | null
          rating: number | null
          testimonial_approved: boolean
          transcript: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          feedback_id?: string
          feedback_type?: string | null
          highlight?: string | null
          is_testimonial?: boolean | null
          linkedin_recommendation_clicked?: boolean | null
          linkedin_recommendation_url?: string | null
          media_url?: string | null
          meeting_id?: string | null
          rating?: number | null
          testimonial_approved?: boolean
          transcript?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          feedback_id?: string
          feedback_type?: string | null
          highlight?: string | null
          is_testimonial?: boolean | null
          linkedin_recommendation_clicked?: boolean | null
          linkedin_recommendation_url?: string | null
          media_url?: string | null
          meeting_id?: string | null
          rating?: number | null
          testimonial_approved?: boolean
          transcript?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "host_info"
            referencedColumns: ["meeting_id"]
          },
          {
            foreignKeyName: "feedback_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["meeting_id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "searchable_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      health: {
        Row: {
          churn_score: number | null
          engagement_score: number | null
          joined_at: string
          keys_active: Json | null
          keys_progress: number | null
          last_activity_at: string | null
          last_community_post_at: string | null
          last_community_post_content: string | null
          last_community_post_engaged: boolean | null
          last_linkedin_post_at: string | null
          last_linkedin_post_content: string | null
          last_linkedin_post_engaged: boolean | null
          last_reached_out_at: string | null
          need_latest: string | null
          notes: string[] | null
          retention_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          churn_score?: number | null
          engagement_score?: number | null
          joined_at: string
          keys_active?: Json | null
          keys_progress?: number | null
          last_activity_at?: string | null
          last_community_post_at?: string | null
          last_community_post_content?: string | null
          last_community_post_engaged?: boolean | null
          last_linkedin_post_at?: string | null
          last_linkedin_post_content?: string | null
          last_linkedin_post_engaged?: boolean | null
          last_reached_out_at?: string | null
          need_latest?: string | null
          notes?: string[] | null
          retention_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          churn_score?: number | null
          engagement_score?: number | null
          joined_at?: string
          keys_active?: Json | null
          keys_progress?: number | null
          last_activity_at?: string | null
          last_community_post_at?: string | null
          last_community_post_content?: string | null
          last_community_post_engaged?: boolean | null
          last_linkedin_post_at?: string | null
          last_linkedin_post_content?: string | null
          last_linkedin_post_engaged?: boolean | null
          last_reached_out_at?: string | null
          need_latest?: string | null
          notes?: string[] | null
          retention_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userhealth_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "uservector"
            referencedColumns: ["user_id"]
          },
        ]
      }
      hosts: {
        Row: {
          created_at: string
          email_alternative: string | null
          ff_api_key: string | null
          introduction: string | null
          li_session_cookie: string | null
          li_user_agent: string | null
          meeting_callback_url: string | null
          name: string | null
          notice: string | null
          status: string | null
          testimonial_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email_alternative?: string | null
          ff_api_key?: string | null
          introduction?: string | null
          li_session_cookie?: string | null
          li_user_agent?: string | null
          meeting_callback_url?: string | null
          name?: string | null
          notice?: string | null
          status?: string | null
          testimonial_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email_alternative?: string | null
          ff_api_key?: string | null
          introduction?: string | null
          li_session_cookie?: string | null
          li_user_agent?: string | null
          meeting_callback_url?: string | null
          name?: string | null
          notice?: string | null
          status?: string | null
          testimonial_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "searchable_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      inputfeeds: {
        Row: {
          created_at: string | null
          data_source: string
          input_id: string
          input_type: string
          is_latest: boolean
          is_processed: boolean | null
          raw_content: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data_source: string
          input_id?: string
          input_type: string
          is_latest?: boolean
          is_processed?: boolean | null
          raw_content: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          data_source?: string
          input_id?: string
          input_type?: string
          is_latest?: boolean
          is_processed?: boolean | null
          raw_content?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
      kpi_history: {
        Row: {
          committed_leads: number | null
          convinced_members: number | null
          engaged_hot_leads: number | null
          interested_leads: number | null
          members: number | null
          members_received_product: number | null
          pre_investment_executed: number | null
          pre_investment_prepared: number | null
          product_qualified: number | null
          product_rated: number | null
          product_variants_delivered: number | null
          random_image_urls: string[] | null
          timestamp: string
          total_leads: number | null
          users_signed_in_today: number | null
        }
        Insert: {
          committed_leads?: number | null
          convinced_members?: number | null
          engaged_hot_leads?: number | null
          interested_leads?: number | null
          members?: number | null
          members_received_product?: number | null
          pre_investment_executed?: number | null
          pre_investment_prepared?: number | null
          product_qualified?: number | null
          product_rated?: number | null
          product_variants_delivered?: number | null
          random_image_urls?: string[] | null
          timestamp?: string
          total_leads?: number | null
          users_signed_in_today?: number | null
        }
        Update: {
          committed_leads?: number | null
          convinced_members?: number | null
          engaged_hot_leads?: number | null
          interested_leads?: number | null
          members?: number | null
          members_received_product?: number | null
          pre_investment_executed?: number | null
          pre_investment_prepared?: number | null
          product_qualified?: number | null
          product_rated?: number | null
          product_variants_delivered?: number | null
          random_image_urls?: string[] | null
          timestamp?: string
          total_leads?: number | null
          users_signed_in_today?: number | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          converted_at: string | null
          converted_to_user: boolean | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          interested_in_updates: boolean | null
          is_aaa_member: boolean
          link_linkedin: string | null
          on_waitlist: boolean | null
          status: string | null
          unsubscribed_at: string | null
          updated_at: string | null
          user_id: string | null
          willing_to_host: boolean | null
        }
        Insert: {
          converted_at?: string | null
          converted_to_user?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          interested_in_updates?: boolean | null
          is_aaa_member: boolean
          link_linkedin?: string | null
          on_waitlist?: boolean | null
          status?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_host?: boolean | null
        }
        Update: {
          converted_at?: string | null
          converted_to_user?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          interested_in_updates?: boolean | null
          is_aaa_member?: boolean
          link_linkedin?: string | null
          on_waitlist?: boolean | null
          status?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_host?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
      linkedin: {
        Row: {
          about: string | null
          accomplishments: string[] | null
          company_linkedin: string | null
          created_at: string | null
          current_company: string | null
          current_job_title: string | null
          education: string[] | null
          email: string | null
          experience: string[] | null
          full_name: string | null
          interests: string[] | null
          latitude: string | null
          location: string | null
          longitude: string | null
          phone: string | null
          profile_photo_url: string | null
          profile_url: string
          recommendations: number | null
          skills: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          accomplishments?: string[] | null
          company_linkedin?: string | null
          created_at?: string | null
          current_company?: string | null
          current_job_title?: string | null
          education?: string[] | null
          email?: string | null
          experience?: string[] | null
          full_name?: string | null
          interests?: string[] | null
          latitude?: string | null
          location?: string | null
          longitude?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          profile_url: string
          recommendations?: number | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          accomplishments?: string[] | null
          company_linkedin?: string | null
          created_at?: string | null
          current_company?: string | null
          current_job_title?: string | null
          education?: string[] | null
          email?: string | null
          experience?: string[] | null
          full_name?: string | null
          interests?: string[] | null
          latitude?: string | null
          location?: string | null
          longitude?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          profile_url?: string
          recommendations?: number | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "linkedin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
      matches: {
        Row: {
          communication_compatibility: string | null
          complementary_skills: string[] | null
          created_at: string | null
          experience_level: string | null
          explanation: string | null
          geographical_synergy: string | null
          match_id: string
          matched_user_id: string
          matching_score: number | null
          potential_collaboration: string | null
          shared_interests: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          communication_compatibility?: string | null
          complementary_skills?: string[] | null
          created_at?: string | null
          experience_level?: string | null
          explanation?: string | null
          geographical_synergy?: string | null
          match_id?: string
          matched_user_id: string
          matching_score?: number | null
          potential_collaboration?: string | null
          shared_interests?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          communication_compatibility?: string | null
          complementary_skills?: string[] | null
          created_at?: string | null
          experience_level?: string | null
          explanation?: string | null
          geographical_synergy?: string | null
          match_id?: string
          matched_user_id?: string
          matching_score?: number | null
          potential_collaboration?: string | null
          shared_interests?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_matched_user_id_fkey"
            columns: ["matched_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_matched_user_id_fkey"
            columns: ["matched_user_id"]
            isOneToOne: false
            referencedRelation: "searchable_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "searchable_users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      meetings: {
        Row: {
          briefing: string | null
          created_at: string | null
          duration: number | null
          event_end_time: string
          event_start_time: string
          extraction_status: string
          feedback_quotes: Json | null
          guest_email: string
          guest_user_id: string | null
          host_email: string
          host_user_id: string | null
          language: string
          meeting_id: string
          meeting_status: string
          meeting_timezone: string
          meeting_title: string
          meeting_url: string | null
          rescheduleorcancel_url: string | null
          summary: string | null
          transcript_url: string | null
          updated_at: string | null
          vector_store_expires_at: string | null
          vector_store_id: string | null
        }
        Insert: {
          briefing?: string | null
          created_at?: string | null
          duration?: number | null
          event_end_time: string
          event_start_time: string
          extraction_status?: string
          feedback_quotes?: Json | null
          guest_email: string
          guest_user_id?: string | null
          host_email: string
          host_user_id?: string | null
          language?: string
          meeting_id?: string
          meeting_status?: string
          meeting_timezone: string
          meeting_title: string
          meeting_url?: string | null
          rescheduleorcancel_url?: string | null
          summary?: string | null
          transcript_url?: string | null
          updated_at?: string | null
          vector_store_expires_at?: string | null
          vector_store_id?: string | null
        }
        Update: {
          briefing?: string | null
          created_at?: string | null
          duration?: number | null
          event_end_time?: string
          event_start_time?: string
          extraction_status?: string
          feedback_quotes?: Json | null
          guest_email?: string
          guest_user_id?: string | null
          host_email?: string
          host_user_id?: string | null
          language?: string
          meeting_id?: string
          meeting_status?: string
          meeting_timezone?: string
          meeting_title?: string
          meeting_url?: string | null
          rescheduleorcancel_url?: string | null
          summary?: string | null
          transcript_url?: string | null
          updated_at?: string | null
          vector_store_expires_at?: string | null
          vector_store_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_guest_user_id_fkey"
            columns: ["guest_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "meetings_guest_user_id_fkey"
            columns: ["guest_user_id"]
            isOneToOne: false
            referencedRelation: "searchable_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "meetings_host_user_id_fkey"
            columns: ["host_user_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["user_id"]
          },
        ]
      }
      metakeys: {
        Row: {
          color_code: string | null
          created_at: string
          description: string | null
          examples: string | null
          id: number
          name: string
          status: "default" | "valid" | "invalid" | "expired" | null
          system: boolean
          updated_at: string
        }
        Insert: {
          color_code?: string | null
          created_at?: string
          description?: string | null
          examples?: string | null
          id?: number
          name: string
          status?: "default" | "valid" | "invalid" | "expired" | null
          system?: boolean
          updated_at?: string
        }
        Update: {
          color_code?: string | null
          created_at?: string
          description?: string | null
          examples?: string | null
          id?: number
          name?: string
          status?: "default" | "valid" | "invalid" | "expired" | null
          system?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_color_key"
            columns: ["color_code"]
            isOneToOne: false
            referencedRelation: "colorkey"
            referencedColumns: ["color_code"]
          },
        ]
      }
      profiles: {
        Row: {
          business_goals: string[] | null
          calendar_booking_url: string | null
          career_stage: string | null
          created_at: string
          hobbies: string[] | null
          image_url: string | null
          industry: string | null
          interest_hosting: boolean
          interest_podcast: boolean
          interest_spotlight: boolean
          interest_updates: boolean
          interests: string[] | null
          key_skills: string[] | null
          link_aaa: string | null
          link_linkedin: string | null
          location: string | null
          logo_url: string | null
          name: string | null
          preferred_communication: string | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          business_goals?: string[] | null
          calendar_booking_url?: string | null
          career_stage?: string | null
          created_at?: string
          hobbies?: string[] | null
          image_url?: string | null
          industry?: string | null
          interest_hosting?: boolean
          interest_podcast?: boolean
          interest_spotlight?: boolean
          interest_updates?: boolean
          interests?: string[] | null
          key_skills?: string[] | null
          link_aaa?: string | null
          link_linkedin?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          preferred_communication?: string | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          business_goals?: string[] | null
          calendar_booking_url?: string | null
          career_stage?: string | null
          created_at?: string
          hobbies?: string[] | null
          image_url?: string | null
          industry?: string | null
          interest_hosting?: boolean
          interest_podcast?: boolean
          interest_spotlight?: boolean
          interest_updates?: boolean
          interests?: string[] | null
          key_skills?: string[] | null
          link_aaa?: string | null
          link_linkedin?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          preferred_communication?: string | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
      uservector: {
        Row: {
          active: boolean
          created_at: string | null
          file_id: string | null
          file_size: number | null
          updated_at: string | null
          user_id: string
          vs_id: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          file_id?: string | null
          file_size?: number | null
          updated_at?: string | null
          user_id: string
          vs_id?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          file_id?: string | null
          file_size?: number | null
          updated_at?: string | null
          user_id?: string
          vs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rag_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rag_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      feedback_with_giver: {
        Row: {
          content: string | null
          created_at: string | null
          feedback_type: string | null
          giver_name: string | null
          is_testimonial: boolean | null
          rating: number | null
        }
        Relationships: []
      }
      host_info: {
        Row: {
          host_image_url: string | null
          host_name: string | null
          host_testimonial_url: string | null
          meeting_id: string | null
        }
        Relationships: []
      }
      mv_current_kpis: {
        Row: {
          committed_leads: number | null
          convinced_members: number | null
          engaged_hot_leads: number | null
          interested_leads: number | null
          members: number | null
          members_received_product: number | null
          pre_investment_executed: number | null
          pre_investment_prepared: number | null
          product_qualified: number | null
          product_rated: number | null
          product_variants_delivered: number | null
          random_image_urls: string[] | null
          total_leads: number | null
          users_signed_in_today: number | null
        }
        Relationships: []
      }
      searchable_users: {
        Row: {
          email: string | null
          name: string | null
          search_vector: unknown | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "view_usermatch_teaser"
            referencedColumns: ["user_id"]
          },
        ]
      }
      testimonials_view: {
        Row: {
          career_stage: string | null
          content: string | null
          image_url: string | null
          name: string | null
        }
        Relationships: []
      }
      view_usermatch_teaser: {
        Row: {
          email: string | null
          first_name: string | null
          image_first_match: string | null
          name_first_match: string | null
          raw_user_meta_data: Json | null
          reason_first_match: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_profile_to_scrape: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_url: string
        }[]
      }
      get_user_ids_securely: {
        Args: {
          p_guest_email: string
          p_host_email: string
        }
        Returns: {
          guest_auth_id: string
          host_auth_id: string
        }[]
      }
      refresh_mv_current_kpis: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_users: {
        Args: {
          search_term: string
        }
        Returns: {
          user_id: string
          name: string
          email: string
        }[]
      }
      update_kpi_history: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      key_status: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
