#!/bin/bash
# Exit on any error
set -e
# Run Node.js script to download the test case using bucket name and file path
node <<EOF
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const REPO_NAME = process.env.REPO_NAME;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.');
  process.exit(1);
}

if (!REPO_NAME) {
  console.error('Missing REPO_NAME environment variable.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  try {
    const bucket = 'assessment-tracker';
    const repoPrefix = REPO_NAME.split('_')[0];
    const filePath = repoPrefix + '.js';
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from(bucket)
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file from Supabase storage:', downloadError.message);
      process.exit(1);
    }

    const content = await fileData.text();
    fs.mkdirSync('src/__tests__', { recursive: true });
    fs.writeFileSync('src/__tests__/private.test.jsx', content);
    console.log('File downloaded successfully to src/__tests__/private.test.jsx');
  } catch (e) {
    console.error('Failed to download the test case:', e.message);
    process.exit(1);
  }
})();
EOF
