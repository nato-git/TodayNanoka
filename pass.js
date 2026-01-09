var message = '';

async function sha256(text) {
  const uint8 = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', uint8);
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
}

async function checkpass() {
  const Name = document.getElementById('name').value.trim();
  const Pass = document.getElementById('pass').value.trim();

  if (!Name || !Pass) {
    alert('ユーザー名とパスワードを入力してください');
    return;
  }

  const hashedName = await sha256(Name);
  const hashedPass = await sha256(Pass);

  const correctNameHash =
    '57c5d4fa18b55b15f4aec04495fa4f5b134a1d62c8f7c29f45507b1f62d29849';
  const correctPassHash =
    '271b738712d915f212a146deb5f6e12fa6fae4403376d39c1446cd021f378372';

  const secretUrl = 'aHR0cHM6Ly9mb3Jtcy5nbGUvUkZVbjFuUVRMbkxlSkFzdjg=';

  if (hashedName === correctNameHash && hashedPass === correctPassHash) {
    window.open(atob(secretUrl), '_blank');
  } else {
    message =
      'ユーザー名かパスワードが間違っています。ふぃくささん以外はログインしないでください。';
    const errorElement = document.getElementById('notPass');
    if (errorElement) {
      errorElement.innerHTML = `<p style="color:red;">${message}</p>`;
    } else {
      alert(message);
    }
  }
}
