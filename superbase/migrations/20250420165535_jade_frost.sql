/*
  # Add columns to tasks table

  1. Changes
    - Add missing columns to tasks table:
      - `text` (replacing `title`)
      - `priority`
      - `category`
      - `due_date`
      - `notes`

  2. Data Migration
    - Copy existing title data to new text column
    - Set default values for new columns
*/

-- First rename title to text to match frontend code
ALTER TABLE tasks RENAME COLUMN title TO text;

-- Add new columns
ALTER TABLE tasks 
  ADD COLUMN priority text NOT NULL DEFAULT 'medium',
  ADD COLUMN category text NOT NULL DEFAULT 'personal',
  ADD COLUMN due_date timestamptz,
  ADD COLUMN notes text;

-- Update primary key to use correct columns
ALTER TABLE tasks DROP CONSTRAINT tasks_pkey;
ALTER TABLE tasks ADD PRIMARY KEY (id);

-- Add check constraint for priority values
ALTER TABLE tasks ADD CONSTRAINT tasks_priority_check 
  CHECK (priority IN ('low', 'medium', 'high'));

-- Add check constraint for category values  
ALTER TABLE tasks ADD CONSTRAINT tasks_category_check
  CHECK (category IN ('personal', 'work', 'shopping', 'health', 'finance'));

-- Add RLS policy
CREATE POLICY "Enable all access for now" ON tasks
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);