-- ============================================================
-- 情商话术每日学 - Supabase 数据库初始化脚本
-- 在 Supabase Dashboard → SQL Editor 中执行此脚本
-- ============================================================

-- 1. 用户资料表
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null default '匿名用户',
  avatar text default null,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

-- 2. 收藏表
create table if not exists favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  phrase_id text not null,
  created_at timestamptz default now(),
  unique(user_id, phrase_id)
);

-- 3. 打卡表
create table if not exists streaks (
  user_id uuid references auth.users on delete cascade primary key,
  count integer default 0,
  last_check_in date,
  history date[] default '{}'
);

-- 4. 练习记录表
create table if not exists practice_records (
  user_id uuid references auth.users on delete cascade primary key,
  total_attempted integer default 0,
  total_correct integer default 0,
  last_practice_date date
);

-- 5. 社区分享表
create table if not exists community_shares (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  scenario text not null,
  phrase text not null,
  insight text not null,
  likes_count integer default 0,
  created_at timestamptz default now()
);

-- 6. 点赞表
create table if not exists likes (
  user_id uuid references auth.users on delete cascade not null,
  share_id uuid references community_shares on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, share_id)
);

-- 7. 评论表
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  share_id uuid references community_shares on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- ============================================================
-- 触发器：新用户注册自动创建 profile
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', '匿名用户')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 点赞计数函数（RPC）
-- ============================================================
create or replace function increment_likes(share_id uuid)
returns void
language plpgsql
as $$
begin
  update community_shares
  set likes_count = likes_count + 1
  where id = share_id;
end;
$$;

create or replace function decrement_likes(share_id uuid)
returns void
language plpgsql
as $$
begin
  update community_shares
  set likes_count = greatest(0, likes_count - 1)
  where id = share_id;
end;
$$;

create or replace function update_likes_count(share_id uuid)
returns void
language plpgsql
as $$
begin
  update community_shares
  set likes_count = (select count(*) from likes where likes.share_id = community_shares.id)
  where id = share_id;
end;
$$;

-- ============================================================
-- RLS 行级安全策略
-- ============================================================

-- profiles
alter table profiles enable row level security;
create policy "profiles_read_all" on profiles for select using (true);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);
create policy "profiles_update_admin" on profiles for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- favorites
alter table favorites enable row level security;
create policy "favorites_read_own" on favorites for select using (auth.uid() = user_id);
create policy "favorites_insert_own" on favorites for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own" on favorites for delete using (auth.uid() = user_id);

-- streaks
alter table streaks enable row level security;
create policy "streaks_read_own" on streaks for select using (auth.uid() = user_id);
create policy "streaks_write_own" on streaks for insert with check (auth.uid() = user_id);
create policy "streaks_update_own" on streaks for update using (auth.uid() = user_id);
create policy "streaks_delete_own" on streaks for delete using (auth.uid() = user_id);

-- practice_records
alter table practice_records enable row level security;
create policy "practice_read_own" on practice_records for select using (auth.uid() = user_id);
create policy "practice_write_own" on practice_records for insert with check (auth.uid() = user_id);
create policy "practice_update_own" on practice_records for update using (auth.uid() = user_id);

-- community_shares
alter table community_shares enable row level security;
create policy "shares_read_all" on community_shares for select using (true);
create policy "shares_insert_own" on community_shares for insert with check (auth.uid() = user_id);
create policy "shares_delete_own" on community_shares for delete using (auth.uid() = user_id);
create policy "shares_delete_admin" on community_shares for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- likes
alter table likes enable row level security;
create policy "likes_read_all" on likes for select using (true);
create policy "likes_insert_own" on likes for insert with check (auth.uid() = user_id);
create policy "likes_delete_own" on likes for delete using (auth.uid() = user_id);

-- comments
alter table comments enable row level security;
create policy "comments_read_all" on comments for select using (true);
create policy "comments_insert_own" on comments for insert with check (auth.uid() = user_id);
create policy "comments_delete_own" on comments for delete using (auth.uid() = user_id);
create policy "comments_delete_admin" on comments for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- 完成提示
-- ============================================================
-- 执行完成后：
-- 1. 去 Authentication → Providers 启用 Email 和 GitHub
-- 2. 注册一个账号测试
-- 3. 把你的 profiles.role 改为 'admin'（在 Table Editor 里手动改）
-- 4. 获取 API URL 和 anon key 填入 .env.local
