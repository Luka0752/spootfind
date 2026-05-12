$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Check site
Write-Host "=== SITE ==="
try {
    $r = Invoke-WebRequest -Uri "https://spootfind.com" -Method HEAD -TimeoutSec 8 -ErrorAction Stop
    Write-Host "UP"
} catch {
    Write-Host "FAIL"
}

# Check token
Write-Host "=== TOKEN ==="
$token = $env:VERCEL_TOKEN
if (-not $token) {
    Write-Host "TOKEN_MISSING"
} else {
    Write-Host "TOKEN: $($token.Substring(0, [Math]::Min(20, $token.Length)))..."
    try {
        $r2 = Invoke-WebRequest -Uri "https://api.vercel.com/v13/user" -Headers @{"Authorization"="Bearer $token"} -TimeoutSec 8 -ErrorAction Stop
        Write-Host "TOKEN_OK"
    } catch {
        Write-Host "TOKEN_FAIL: $($_.Exception.Response.StatusCode)"
    }
}
