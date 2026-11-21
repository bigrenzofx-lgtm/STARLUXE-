// ======================================
// STARLUXE SUPABASE CONNECTION
// ======================================

const SUPABASE_URL =
    "https://madihfkehzajysbfdpkk.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0bgwC9-7gHIaBr-0JDJ5bw_5Zeo71eh";

// Initialize Supabase
window.STARLUXE_SUPABASE = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("STARLUXE database connection initialized.");
