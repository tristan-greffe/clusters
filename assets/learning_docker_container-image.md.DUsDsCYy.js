import{_ as a,c as t,o as e,a1 as i}from"./chunks/framework.BL94qm72.js";const m=JSON.parse('{"title":"Container and Image Management","description":"","frontmatter":{},"headers":[],"relativePath":"learning/docker/container-image.md","filePath":"learning/docker/container-image.md"}'),s={name:"learning/docker/container-image.md"},n=i(`<h1 id="container-and-image-management" tabindex="-1">Container and Image Management <a class="header-anchor" href="#container-and-image-management" aria-label="Permalink to &quot;Container and Image Management&quot;">​</a></h1><h2 id="start-docker" tabindex="-1">Start Docker <a class="header-anchor" href="#start-docker" aria-label="Permalink to &quot;Start Docker&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div><h2 id="docker-image-management" tabindex="-1">Docker image management <a class="header-anchor" href="#docker-image-management" aria-label="Permalink to &quot;Docker image management&quot;">​</a></h2><h3 id="download-an-image" tabindex="-1">Download an image <a class="header-anchor" href="#download-an-image" aria-label="Permalink to &quot;Download an image&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ubuntu:latest</span></span></code></pre></div><h3 id="list-available-images" tabindex="-1">List available images <a class="header-anchor" href="#list-available-images" aria-label="Permalink to &quot;List available images&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ls</span></span></code></pre></div><ul><li><strong>Displayed Information</strong>: <ul><li><code>REPOSITORY</code>: Image name</li><li><code>TAG</code>: Label for version differentiation</li><li><code>IMAGE ID</code>: Unique identifier</li><li><code>CREATED</code>: Creation date</li><li><code>SIZE</code>: Size</li></ul></li></ul><h3 id="remove-an-image" tabindex="-1">Remove an image <a class="header-anchor" href="#remove-an-image" aria-label="Permalink to &quot;Remove an image&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">IMAGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> I</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">D</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><h2 id="docker-container-management" tabindex="-1">Docker container management <a class="header-anchor" href="#docker-container-management" aria-label="Permalink to &quot;Docker container management&quot;">​</a></h2><h3 id="run-a-container" tabindex="-1">Run a container <a class="header-anchor" href="#run-a-container" aria-label="Permalink to &quot;Run a container&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> container</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ubuntu:latest</span></span></code></pre></div><ul><li><strong>Process</strong>: <ul><li><code>docker-cli</code> asks the Docker daemon to run a container based on <code>ubuntu:latest</code>.</li><li>The daemon downloads the image from DockerHub if it&#39;s not available locally.</li><li>The container is launched and produces output.</li></ul></li></ul><h3 id="list-containers" tabindex="-1">List containers <a class="header-anchor" href="#list-containers" aria-label="Permalink to &quot;List containers&quot;">​</a></h3><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>docker container ls</code></td><td>List running containers</td></tr><tr><td><code>docker container ls --all</code></td><td>List all containers</td></tr></tbody></table><ul><li><strong>Displayed Information</strong>: <ul><li><code>CONTAINER ID</code>: Unique identifier</li><li><code>IMAGE</code>: Name of the image used</li><li><code>COMMAND</code>: Executed command</li><li><code>CREATED</code>: Launch date</li><li><code>STATUS</code>: Container status</li><li><code>PORTS</code>: Network tunnels</li><li><code>NAMES</code>: Container name</li></ul></li></ul><h3 id="run-a-container-1" tabindex="-1">Run a container <a class="header-anchor" href="#run-a-container-1" aria-label="Permalink to &quot;Run a container&quot;">​</a></h3><table><thead><tr><th>Argument</th><th>Usage</th></tr></thead><tbody><tr><td>-it or --interactive</td><td>Interaction with the container</td></tr><tr><td>-d or --detach</td><td>Run in the background</td></tr><tr><td>-n or --name</td><td>Name the container</td></tr><tr><td>--rm</td><td>Remove the container after stopping</td></tr><tr><td>-e</td><td>Set an environment variable</td></tr><tr><td>-p</td><td>Port mapping</td></tr><tr><td>--mount</td><td>Mount a volume to a container (type=volume,src=src_volume,dst=/path_in_container)</td></tr></tbody></table><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> container</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my_ubuntu</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;my_variable=hello_world&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ubuntu:latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Map container ports 9200 and 9300 to host machine ports 9201 and 9301</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> container</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 9201:9200</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 9301:9300</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ubuntu:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># With a volume</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> container</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my_ubuntu</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mount</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> type=volume,src=my_volume,dst=/home/my_folder</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ubuntu:latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span></code></pre></div><h3 id="container-management" tabindex="-1">Container management <a class="header-anchor" href="#container-management" aria-label="Permalink to &quot;Container management&quot;">​</a></h3><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>docker container start &lt;ID or NAME&gt;</code></td><td>Restart a stopped container</td></tr><tr><td><code>docker container start -a &lt;ID or NAME&gt;</code></td><td>Restart a container with standard output</td></tr><tr><td><code>docker container stop &lt;ID or NAME&gt;</code></td><td>Stop a container</td></tr><tr><td><code>docker container rm &lt;ID or NAME&gt;</code></td><td>Remove a container</td></tr><tr><td><code>docker container prune</code></td><td>Remove all stopped containers</td></tr></tbody></table><h3 id="visualization-access" tabindex="-1">Visualization &amp; access <a class="header-anchor" href="#visualization-access" aria-label="Permalink to &quot;Visualization &amp; access&quot;">​</a></h3><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>docker container logs &lt;ID or NAME&gt; (-f --tail)</code></td><td>View logs of a container</td></tr><tr><td><code>docker container exec -it &lt;ID or NAME&gt; bash</code></td><td>Access the shell of a running container</td></tr><tr><td><code>docker container inspect &lt;ID or NAME&gt;</code></td><td>Inspect container details</td></tr><tr><td><code>docker container inspect &lt;ID or NAME&gt; | grep IPAddress</code></td><td>Find the container&#39;s IP address</td></tr></tbody></table><h2 id="data-persistence" tabindex="-1">Data persistence <a class="header-anchor" href="#data-persistence" aria-label="Permalink to &quot;Data persistence&quot;">​</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>docker volume create --name &lt;VOLUME&gt;</code></td><td>Create a volume</td></tr><tr><td><code>docker volume ls</code></td><td>List volumes</td></tr><tr><td><code>docker volume inspect &lt;VOLUME&gt;</code></td><td>Inspect a volume</td></tr></tbody></table><h2 id="docker-system-cleanup" tabindex="-1">Docker system cleanup <a class="header-anchor" href="#docker-system-cleanup" aria-label="Permalink to &quot;Docker system cleanup&quot;">​</a></h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td><code>docker system prune</code></td><td>Clean up Docker (stopped containers, networks, unreferenced images, and build caches)</td></tr><tr><td><code>docker system prune -f</code></td><td>Force cleanup without confirmation</td></tr><tr><td><code>docker system prune --volumes</code></td><td>Include volumes in the cleanup</td></tr></tbody></table>`,29),d=[n];function r(o,l,h,c,p,k){return e(),t("div",null,d)}const u=a(s,[["render",r]]);export{m as __pageData,u as default};
