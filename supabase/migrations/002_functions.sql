-- Atomic increment for spots_booked to prevent race conditions
create or replace function increment_spots_booked(date_id uuid, qty integer)
returns void language plpgsql as $$
begin
  update workshop_dates
  set spots_booked = spots_booked + qty
  where id = date_id
    and spots_booked + qty <= spots_total;

  if not found then
    raise exception 'Not enough spots available';
  end if;
end;
$$;

-- Grant execute to authenticated and anon roles
grant execute on function increment_spots_booked(uuid, integer) to anon, authenticated;
