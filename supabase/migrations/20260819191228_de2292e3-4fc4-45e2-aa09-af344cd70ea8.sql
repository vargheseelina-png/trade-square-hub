INSERT INTO public.gallery_photos (image_url, caption, album, display_order, featured_on_home, is_published) VALUES
('/__l5e/assets-v1/9d2be5b1-3a4b-4a5b-9c9d-000000000000/x.jpg', 'seed-check', 'Building', 9999, false, false);
DELETE FROM public.gallery_photos WHERE caption = 'seed-check';