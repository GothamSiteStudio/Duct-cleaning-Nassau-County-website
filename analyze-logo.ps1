Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("images\logo.png")
$colors = @{}
for ($x = 0; $x -lt $bmp.Width; $x += 8) {
    for ($y = 0; $y -lt $bmp.Height; $y += 8) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 50) {
            $r = [int]([math]::Round($c.R / 32) * 32)
            $g = [int]([math]::Round($c.G / 32) * 32)
            $b = [int]([math]::Round($c.B / 32) * 32)
            if($r -gt 255){$r=255}
            if($g -gt 255){$g=255}
            if($b -gt 255){$b=255}
            $hex = [string]::Format('#{0:X2}{1:X2}{2:X2}', $r, $g, $b)
            if ($colors.ContainsKey($hex)) { $colors[$hex]++ } else { $colors[$hex] = 1 }
        }
    }
}
$bmp.Dispose()
$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 25 | Format-Table -AutoSize
