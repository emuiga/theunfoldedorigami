// Quick script to check Contentful setup
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function checkContentful() {
  try {
    console.log('📡 Connecting to Contentful...\n');
    
    // Check space
    const space = await client.getSpace();
    console.log(`✅ Connected to space: "${space.name}" (${space.sys.id})\n`);
    
    // Check content types
    const contentTypes = await client.getContentTypes();
    console.log(`📋 Found ${contentTypes.items.length} content type(s):\n`);
    
    contentTypes.items.forEach(ct => {
      console.log(`  - ${ct.name} (API ID: "${ct.sys.id}")`);
      console.log(`    Fields: ${ct.fields.map(f => f.id).join(', ')}\n`);
    });
    
    // Check for origami content type
    const origamiType = contentTypes.items.find(ct => 
      ct.sys.id.toLowerCase() === "origami"
    );
    
    if (origamiType) {
      console.log(`✅ Found "origami" content type!\n`);
      
      // Check entries
      const entries = await client.getEntries({ 
        content_type: origamiType.sys.id,
        include: 2
      });
      console.log(`📝 Found ${entries.items.length} essay(s)\n`);
      
      entries.items.forEach(entry => {
        const fields = entry.fields;
        console.log(`  - ${fields.title || fields.slug || 'Untitled'}`);
        console.log(`    Slug: ${fields.slug || 'N/A'}`);
        console.log(`    Category: ${fields.category || 'N/A'}`);
        console.log(`    Date: ${fields.date || 'N/A'}\n`);
      });
    } else {
      console.log(`❌ "origami" content type not found!\n`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

checkContentful();
