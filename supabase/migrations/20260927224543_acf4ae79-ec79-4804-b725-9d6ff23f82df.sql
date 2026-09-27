UPDATE public.gallery_photos
SET image_url = regexp_replace(image_url, '^.*/([^/]+)$', '/images/\\1')
WHERE image_url LIKE '/__l5e/assets-v1/%';

UPDATE public.committee_members
SET photo_url = regexp_replace(photo_url, '^.*/([^/]+)$', '/images/\\1')
WHERE photo_url LIKE '/__l5e/assets-v1/%';

UPDATE public.events
SET photos = (
  SELECT COALESCE(jsonb_agg(
    CASE
      WHEN jsonb_typeof(photo) = 'string' AND photo #>> '{}' LIKE '/__l5e/assets-v1/%'
        THEN to_jsonb(regexp_replace(photo #>> '{}', '^.*/([^/]+)$', '/images/\\1'))
      WHEN jsonb_typeof(photo) = 'object' AND photo ? 'url' AND photo->>'url' LIKE '/__l5e/assets-v1/%'
        THEN jsonb_set(photo, '{url}', to_jsonb(regexp_replace(photo->>'url', '^.*/([^/]+)$', '/images/\\1')))
      ELSE photo
    END
  ), '[]'::jsonb)
  FROM jsonb_array_elements(CASE WHEN jsonb_typeof(photos) = 'array' THEN photos ELSE '[]'::jsonb END) AS items(photo)
)
WHERE photos::text LIKE '%/__l5e/assets-v1/%';