$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$token = 'vcp_6WFuOiJvNV5kswxbMqKitGkbb3zqPu1iAQuwZIyPqsv8B89ZL70gmZQK'

# Try different API versions
foreach ($ver in @('v6','v10','v12','v13')) {
    try {
        $r = Invoke-WebRequest -Uri "https://api.vercel.com/$ver/user" -Headers @{'Authorization'="Bearer $token"} -TimeoutSec 8 -ErrorAction Stop
        Write-Host "$ver OK: $($r.StatusCode)"
    } catch {
        $code = 0
        try { $code = $_.Exception.Response.StatusCode.value__ } catch {}
        Write-Host "$ver FAIL: $code"
    }
}
