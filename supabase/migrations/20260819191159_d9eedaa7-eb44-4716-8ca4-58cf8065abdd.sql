-- 1. Extend events for the admin panel
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS caption text,
  ADD COLUMN IF NOT EXISTS photos jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;

UPDATE public.events SET category = 'AGM' WHERE title ILIKE '%Annual General Body%';

-- 2. Gallery photos
CREATE TABLE public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  album text NOT NULL DEFAULT 'Building',
  display_order integer NOT NULL DEFAULT 0,
  featured_on_home boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published photos are public" ON public.gallery_photos FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read all photos" ON public.gallery_photos FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert photos" ON public.gallery_photos FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update photos" ON public.gallery_photos FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete photos" ON public.gallery_photos FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER gallery_photos_set_updated_at BEFORE UPDATE ON public.gallery_photos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Committee members
CREATE TABLE public.committee_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text,
  email text,
  is_signatory boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.committee_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.committee_members TO authenticated;
GRANT ALL ON public.committee_members TO service_role;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published members are public" ON public.committee_members FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read all members" ON public.committee_members FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert members" ON public.committee_members FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update members" ON public.committee_members FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete members" ON public.committee_members FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER committee_members_set_updated_at BEFORE UPDATE ON public.committee_members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Notices & circulars
CREATE TABLE public.notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  notice_date date NOT NULL,
  description text,
  file_url text,
  file_name text,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notices TO authenticated;
GRANT ALL ON public.notices TO service_role;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published notices are public" ON public.notices FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read all notices" ON public.notices FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert notices" ON public.notices FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update notices" ON public.notices FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete notices" ON public.notices FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER notices_set_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5. Office information (single row)
CREATE TABLE public.office_info (
  id text PRIMARY KEY DEFAULT 'main',
  building_name text NOT NULL,
  full_name text NOT NULL,
  established text NOT NULL,
  total_floors text NOT NULL,
  total_units text NOT NULL,
  working_hours text NOT NULL,
  working_days text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  about text NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.office_info TO anon;
GRANT SELECT, INSERT, UPDATE ON public.office_info TO authenticated;
GRANT ALL ON public.office_info TO service_role;
ALTER TABLE public.office_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published office info is public" ON public.office_info FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read office info" ON public.office_info FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert office info" ON public.office_info FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update office info" ON public.office_info FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER office_info_set_updated_at BEFORE UPDATE ON public.office_info FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. Payments information (single row)
CREATE TABLE public.payments_info (
  id text PRIMARY KEY DEFAULT 'main',
  charge_title text NOT NULL,
  charge_amount text NOT NULL,
  charge_period text NOT NULL,
  payment_mode_note text NOT NULL,
  bank_name text NOT NULL,
  branch text NOT NULL,
  account_number text NOT NULL,
  ifsc_code text NOT NULL,
  support_name text NOT NULL,
  support_phones text NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments_info TO anon;
GRANT SELECT, INSERT, UPDATE ON public.payments_info TO authenticated;
GRANT ALL ON public.payments_info TO service_role;
ALTER TABLE public.payments_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published payment info is public" ON public.payments_info FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read payment info" ON public.payments_info FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert payment info" ON public.payments_info FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update payment info" ON public.payments_info FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER payments_info_set_updated_at BEFORE UPDATE ON public.payments_info FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 7. Site settings (single row)
CREATE TABLE public.site_settings (
  id text PRIMARY KEY DEFAULT 'main',
  logo_url text,
  contact_phone text NOT NULL,
  whatsapp_number text,
  footer_text text NOT NULL,
  extra_email text,
  is_published boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published settings are public" ON public.site_settings FOR SELECT USING (is_published = true);
CREATE POLICY "Admins read settings" ON public.site_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_set_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 8. Seed with the real content already on the site
INSERT INTO public.committee_members (name, role, is_signatory, display_order) VALUES
('Mr. A.Y. Sakaria', 'Chairman', true, 1),
('Mr. Varghese Jacob', 'Hon. Secretary', true, 2),
('Mr. Vishal Chhabria', 'Treasurer', true, 3),
('Mr. Vinay Mohan Puri', 'Committee Member', false, 4),
('Mrs. Seema Varghese', 'Committee Member', false, 5),
('Mrs. Shyama Sakaria', 'Committee Member', false, 6),
('Mr. Tony Fernandes', 'Committee Member', false, 7),
('Mr. M.N. Patel', 'Committee Member', false, 8);

INSERT INTO public.office_info (id, building_name, full_name, established, total_floors, total_units, working_hours, working_days, phone, email, address, about) VALUES
('main', 'Trade Square', 'Trade Square Premises Cooperative Society Ltd.', '11th April 2022', '7', '50+', 'Open all 7 days', 'Monday – Sunday', '+91 98201 40676', 'manager.tradesquaresociety@gmail.com', 'Mehra Compound, Andheri–Kurla Road, Safed Pul, Saki Naka, Mumbai, Maharashtra 400072', 'Trade Square is a commercial office building in Saki Naka, Mumbai, owned and governed by its members through Trade Square Premises Cooperative Society Ltd. Established on 11th April 2022, the building comprises a ground floor plus seven upper floors with 50+ office units, and remains open all seven days of the week.');

INSERT INTO public.payments_info (id, charge_title, charge_amount, charge_period, payment_mode_note, bank_name, branch, account_number, ifsc_code, support_name, support_phones) VALUES
('main', 'Quarterly Legal & Administrative Charges', '₹6,000', 'Per quarter', 'Payments are currently accepted via Bank Transfer only.', 'The Mumbai District Co-operative Bank', 'Saki Naka', '037100600000544', 'MDCB0680037', 'Sneha Tripathi', '8329774807 / 9763153806');

INSERT INTO public.site_settings (id, contact_phone, whatsapp_number, footer_text, extra_email) VALUES
('main', '+91 98201 40676', '919820140676', '© 2026 Trade Square Premises Cooperative Society Ltd. All rights reserved.', 'varghese@maraekat.com');

INSERT INTO public.gallery_photos (image_url, caption, album, display_order, featured_on_home) VALUES
('/__l5e/assets-v1/9b4bd0f8-0000-0000-0000-000000000000/placeholder.jpg', 'placeholder', 'Building', 999, false);
DELETE FROM public.gallery_photos WHERE album = 'Building' AND caption = 'placeholder';