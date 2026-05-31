const gicSupabaseUrl = "https://abpweawndpnaftkcsdcp.supabase.co";
const gicSupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicHdlYXduZHBuYWZ0a2NzZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1Njc1ODMsImV4cCI6MjA5NTE0MzU4M30.B3rV8pp0HL9xYBhGDcJGJD3b1unjtNk1ChB_4_OgW9Y";

async function test() {
  try {
    console.log('Fetching actual students...');
    const dbResponse = await fetch(`${gicSupabaseUrl}/rest/v1/students?student_id=neq.GIC-GLOBAL&limit=5`, {
      method: 'GET',
      headers: {
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      }
    });
    
    console.log('Status:', dbResponse.status);
    const data = await dbResponse.json();
    console.log('Students count:', data.length);
    data.forEach(s => {
      console.log(`ID: ${s.student_id}, Email: ${s.email}, IP: ${s.last_ip}, UA: ${s.last_ua}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
