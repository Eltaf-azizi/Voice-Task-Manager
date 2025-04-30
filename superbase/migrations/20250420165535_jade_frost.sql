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
