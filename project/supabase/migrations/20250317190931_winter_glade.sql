/*
  # Add test user

  1. Changes
    - Add a test user to auth.users
    - Create corresponding profile entry
    
  2. Security
    - User is pre-confirmed (email_confirmed_at is set)
    - Password is hashed using bcrypt
*/

-- Create test user if it doesn't exist
DO $$
DECLARE
  test_user_id uuid;
BEGIN
  -- Check if test user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'test@example.com'
  ) THEN
    -- Insert test user into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'test@example.com',
      crypt('test1234', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex')
    )
    RETURNING id INTO test_user_id;

    -- Insert corresponding profile
    INSERT INTO profiles (
      id,
      full_name,
      phone,
      created_at,
      updated_at
    )
    VALUES (
      test_user_id,
      'Test User',
      '(555) 123-4567',
      NOW(),
      NOW()
    );
  END IF;
END $$;