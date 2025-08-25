/**
 * TypeScript types for Supabase database schema.
 * These types should match your Supabase database structure.
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          avatar_url?: string
          balance: number
          is_active: boolean
          preferences: Json
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          avatar_url?: string
          balance?: number
          is_active?: boolean
          preferences?: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          balance?: number
          is_active?: boolean
          preferences?: Json
        }
      }
      bets: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          selections: Json
          total_stake: number
          potential_payout: number
          actual_payout?: number
          status: 'pending' | 'won' | 'lost' | 'push' | 'cancelled'
          bet_type: 'single' | 'multiple'
          settled_at?: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          selections: Json
          total_stake: number
          potential_payout: number
          actual_payout?: number
          status?: 'pending' | 'won' | 'lost' | 'push' | 'cancelled'
          bet_type?: 'single' | 'multiple'
          settled_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          selections?: Json
          total_stake?: number
          potential_payout?: number
          actual_payout?: number
          status?: 'pending' | 'won' | 'lost' | 'push' | 'cancelled'
          bet_type?: 'single' | 'multiple'
          settled_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          created_at: string
          amount: number
          type: 'deposit' | 'withdrawal' | 'bet' | 'payout' | 'bonus'
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          description: string
          reference_id?: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          amount: number
          type: 'deposit' | 'withdrawal' | 'bet' | 'payout' | 'bonus'
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          description: string
          reference_id?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          amount?: number
          type?: 'deposit' | 'withdrawal' | 'bet' | 'payout' | 'bonus'
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          description?: string
          reference_id?: string
        }
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
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

// Convenience types
export type Profile = Tables<'profiles'>
export type Bet = Tables<'bets'>
export type Transaction = Tables<'transactions'>
