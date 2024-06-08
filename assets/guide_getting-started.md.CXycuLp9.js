import{_ as e,c as t,o as s,a1 as a}from"./chunks/framework.BwTyoF0R.js";const k=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"guide/getting-started.md","filePath":"guide/getting-started.md"}'),i={name:"guide/getting-started.md"},r=a('<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h1><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Before you continue, ensure that the following prerequisites are installed on your system:</p><ul><li><a href="https://helm.sh/docs/intro/install/" target="_blank" rel="noreferrer">helm</a> we currently require the <code>3.11</code> version since it supports the range of k8s version we manage. See <a href="https://helm.sh/docs/topics/version_skew/#supported-version-skew" target="_blank" rel="noreferrer">here</a></li><li><a href="https://github.com/databus23/helm-diff" target="_blank" rel="noreferrer">helm-diff plugin</a> to be able to diff new configuration with what&#39;s currently deployed remotely.</li><li><a href="https://github.com/jkroepke/helm-secrets" target="_blank" rel="noreferrer">helm-secrets plugin</a> to be able to store encrypted secrets in the repo and decrypt them before deployment.</li><li><a href="https://age-encryption.org/" target="_blank" rel="noreferrer">age</a> this is the &#39;low-level&#39; encryption tool used to encrypt/decrypt secrets.</li><li><a href="https://github.com/getsops/sops#encrypting-using-age" target="_blank" rel="noreferrer">sops</a> this wraps around <code>age</code> to encrypt/decrypt yaml values.</li></ul><h2 id="file-structure" tabindex="-1">File Structure <a class="header-anchor" href="#file-structure" aria-label="Permalink to &quot;File Structure&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre></div><h2 id="first-time-setup" tabindex="-1">First-Time Setup <a class="header-anchor" href="#first-time-setup" aria-label="Permalink to &quot;First-Time Setup&quot;">​</a></h2><ol><li>clone this project</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git clone https://github.com/tristan-greffe/clusters.git</span></span></code></pre></div><ol start="2"><li>create an <a href="https://age-encryption.org/" target="_blank" rel="noreferrer">age</a> keypair for yourself. The private key will be used to decrypt secrets in our projects.</li></ol><p>To encrypt/decrypt secrets stored in this repo, you must be added to the list of recipients of the secret files. Start by generating a public/private key pair for yourself:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">age-keygen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;clusters/age/keys.txt&quot;</span></span></code></pre></div><p>The command will print the public key in the terminal; communicate this key to an already authorized developer. This key pair functions like an ID card for yourself. Using the public part, we can encrypt files ensuring you can decrypt them. The private part is used only for decryption and should never be shared. It is stored in the clusters/age/keys.txt file.</p><div class="warning custom-block github-alert"><p class="custom-block-title">WARNING</p><p>Register this age keypair in your password manager; it is essential to keep it safe.</p></div><ol start="3"><li>grant the necessary permissions to execute the scripts:</li></ol><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./scripts/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.sh</span></span></code></pre></div>',16),n=[r];function l(o,p,h,c,d,u){return s(),t("div",null,n)}const y=e(i,[["render",l]]);export{k as __pageData,y as default};
