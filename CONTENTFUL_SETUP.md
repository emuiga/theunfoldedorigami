# Contentful CMS Setup Guide

This guide will help you set up Contentful to manage your essays.

## Step 1: Create a Contentful Account

1. Go to [Contentful](https://www.contentful.com/) and sign up for a free account
2. Create a new space (or use an existing one)

## Step 2: Create the Essay Content Type

1. In your Contentful space, go to **Content model** → **Add content type**
2. Name it "Essay" (or "essay" - the API ID will be lowercase)
3. Add the following fields:

### Required Fields:
- **Title** (Short text)
  - Field ID: `title`
  - Required: Yes
- **Slug** (Short text)
  - Field ID: `slug`
  - Required: Yes
  - Help text: "URL-friendly identifier (e.g., 'my-essay-title')"
  - Validation: Unique
- **Date** (Date & time)
  - Field ID: `date`
  - Required: Yes
  - Format: Date and time
- **Content** (Long text)
  - Field ID: `content`
  - Required: Yes
  - Help text: "Use Markdown for formatting. You can add images inline using: ![alt text](image-url)"

### Optional Fields:
- **Category** (Short text, single line)
  - Field ID: `category`
  - Required: No
  - Help text: "One of: origami (all essays), truth, coding, random, thoughts"
  - Note: You can add new categories later by updating the code. Categories are optional.
- **Excerpt** (Short text, multiple lines)
  - Field ID: `excerpt`
  - Required: No
  - Help text: "Brief summary for listing pages"
- **Image** (Media - Images)
  - Field ID: `image`
  - Required: No
  - Help text: "Hero image for the essay"
- **Folds** (Number - Integer)
  - Field ID: `folds`
  - Required: No
  - Help text: "Number of folds in the origami metaphor"

## Step 3: Get Your API Keys

1. Go to **Settings** → **API keys**
2. Click **Add API key** (or use the default "Content delivery / preview tokens")
3. Copy the following:
   - **Space ID**
   - **Content delivery API - access token**

## Step 4: Configure Your Environment

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Contentful credentials to `.env.local`:
   ```
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_ACCESS_TOKEN=your_access_token_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 5: Create Your First Essay

1. Go to **Content** in Contentful
2. Click **Add entry** → Select **Essay**
3. Fill in the required fields:
   - **Title**: "My First Essay"
   - **Slug**: "my-first-essay"
   - **Date**: Choose today's date
   - **Content**: Write your essay in Markdown format
4. Optionally add:
   - **Category**: "thoughts"
   - **Excerpt**: "A brief description"
   - **Image**: Upload a hero image
5. Click **Publish**

## Step 6: Verify It Works

1. Visit `http://localhost:3000/unfold` - you should see your essay
2. Click on it to view the full essay
3. Check that it appears in the correct category page

## Tips

- **Markdown Support**: The content field supports full Markdown syntax including images
- **Hero Image**: Use the `Image` field for the main article hero image (displayed at the top)
- **In-Article Images**: You can add images directly in your Markdown content using:
  - External URLs: `![Description](https://example.com/image.jpg)`
  - Contentful Assets: Upload images to Contentful Assets, then copy the URL and use: `![Description](https://images.ctfassets.net/.../image.jpg)`
  - You can also use HTML for more control: `<img src="url" alt="description" />`
- **Image Uploads**: Images uploaded to Contentful are automatically optimized and served via their CDN
- **Preview**: Use Contentful's preview feature to see drafts before publishing
- **Slugs**: Keep slugs URL-friendly (lowercase, hyphens, no spaces)

### Adding Images in Your Content

You have two image fields:
1. **Hero Image** (the `image` field) - The main image displayed at the top of the article
2. **In-Article Images** - Added directly in the Markdown content field

**Example Markdown with images:**
```markdown
Here's some text about origami.

![An origami crane](https://images.ctfassets.net/your-space/image-id.jpg)

More content here...

You can also add images with captions or links:

[![Clickable image](https://example.com/image.jpg)](https://example.com)
```

## Fallback to File System

If you don't set up Contentful environment variables, the app will automatically fall back to reading essays from the `content/essays` folder (MDX files).

