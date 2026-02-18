

# Backend Setup Plan

## Overview
Add a full backend to the app using Lovable Cloud (Supabase) with user authentication (email/password), user profiles, and database tables for all the core features: law submissions, votes, comments, and follows.

## What You'll Get
- **Sign up / Log in / Log out** with email and password
- **User profiles** with display name and handle visible to others
- **Persistent data** -- submissions, votes, comments, and follows all saved to the database
- **Privacy and security** -- Row Level Security so users can only modify their own data

## Step-by-Step Plan

### 1. Enable Lovable Cloud
Spin up the Supabase backend automatically -- no external accounts needed.

### 2. Create Database Tables

**profiles** -- stores public user info
- `id` (links to auth user), `display_name`, `handle`, `is_public`, `created_at`

**submissions** -- law proposals
- `id`, `user_id`, `title`, `description`, `bullet_points` (text array), `created_at`

**submission_votes** -- upvotes/downvotes on submissions
- `id`, `user_id`, `submission_id`, `vote_type` (up/down), unique per user+submission

**votable_laws** -- laws available for yes/no voting
- `id`, `title`, `description`, `bullet_points` (text array), `created_at`

**law_votes** -- yes/no votes on laws
- `id`, `user_id`, `law_id`, `vote` (yes/no), unique per user+law

**comments** -- threaded comments on submissions and laws
- `id`, `user_id`, `submission_id` (nullable), `law_id` (nullable), `parent_comment_id` (nullable for replies), `text`, `created_at`

**comment_votes** -- upvotes/downvotes on comments
- `id`, `user_id`, `comment_id`, `vote_type` (up/down)

**follows** -- who follows whom
- `id`, `follower_id`, `following_id`, `is_active` (for delegation), `weight`

**user_settings** -- privacy and voting preferences
- `id`, `user_id`, `privacy`, `voting_mode`, `algorithm`

### 3. Row Level Security (RLS)
- Everyone can read public submissions, laws, comments, and public profiles
- Only the owner can insert/update/delete their own submissions, votes, comments, follows, and settings
- Private profiles hide voting history from other users

### 4. Auto-Create Profile on Sign Up
A database trigger will automatically create a profile row when someone signs up.

### 5. Authentication Pages
- **Login page** with email and password fields
- **Sign up page** with display name, handle, email, and password
- **Protected routes** -- redirect to login if not signed in
- **Log out** button in settings

### 6. Replace Mock Data with Real Queries
Update every page to fetch from and write to the database instead of using mock data:
- **Submissions page** -- create, list, vote, and comment
- **Vote page** -- list laws, cast yes/no votes
- **Follow page** -- search users, follow/unfollow, view profiles
- **Settings page** -- save preferences to database

### 7. Seed Initial Data
Pre-populate the `votable_laws` table with the existing mock laws so the Vote page isn't empty on day one.

## Technical Details

- All database queries use the Supabase JS client with React Query for caching
- Vote counts are computed from the votes tables (count of up vs down)
- Comments support one level of nesting via `parent_comment_id`
- The liquid democracy delegation logic will use the `follows` table's `is_active` and `weight` columns, calculated client-side for now

