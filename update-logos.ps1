# Update logo sizes across all HTML files
$base = 'c:\Users\orens\OneDrive\שולחן העבודה\alpha marketing projects\Mati long island\Duct cleaning Nassau County website'
$files = Get-ChildItem -Path $base -Recurse -Filter *.html

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.UTF8Encoding]::new($false))
    
    # Update header logo - width="180" height="60" -> width="37" height="80"
    $content = $content -replace 'alt="Duct Cleaning Nassau County" width="180" height="60"', 'alt="Duct Cleaning Nassau County" width="37" height="80"'
    
    # Update footer logo - width="160" height="53" -> width="37" height="80"
    $content = $content -replace 'class="footer-logo" width="160" height="53"', 'class="footer-logo" width="28" height="60"'
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Updated: $($file.Name)"
}
Write-Host "Done."
