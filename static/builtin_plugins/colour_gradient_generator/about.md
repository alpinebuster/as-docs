<div id="about-page">
<style>
  #about-page {
    display: flex;
		flex-direction: column;
    flex-grow: 1;
  }
  #about-content {
    display: flex;
		flex-direction: column;
    flex-grow: 1;
  }
  #about-content > img {
    width: 100%;
    height: 128px;
    object-fit: contain;
    margin: 16px 0 24px;
    filter: drop-shadow(0 3px 10px #0006);
  }
  .about-colour-gradient {
    display: flex;
    filter: drop-shadow(0 3px 10px #0006);
    padding: 0 20px;
  }
  .about-colour-gradient > div {
    flex: 1;
    aspect-ratio: 1;
    position: relative;
  }
  .about-colour-gradient > div:nth-child(2):last-child {
    flex: 8;
    aspect-ratio: 0;
  }
  .about-colour-gradient > div:nth-child(5)::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 4px;
    background-color: var(--color-accent);
  }
  #about-markdown-links {
    display: flex;
    justify-content: space-around;
    margin: 20px 20px 0;
  }
  #about-markdown-links > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 5px;
    text-decoration: none;
    flex-grow: 1;
    flex-basis: 0;
    color: var(--color-subtle_text);
    text-align: center;
  }
  #about-markdown-links > a:hover {
    background-color: var(--color-accent);
    color: var(--color-accent_text);
    border-radius: 4px;
  }
  #about-markdown-links > a > i {
    font-size: 32px;
    width: 100%;
    max-width: initial;
    height: 32px;
    text-align: center;
  }
  #about-markdown-links > a:hover > i {
    color: var(--color-accent_text) !important;
  }
  #about-markdown-links > a > p {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0;
  }
</style>


<div id="about-content">
  <img src="/builtin_plugins/colour_gradient_generator/assets/logo.webp" />
  <p>This plugin generates hue shifted colour gradient palettes from a single colour.</p>
  <h2>Example</h2>
  <h3>Input Colour</h3>
  <div class="about-colour-gradient">
    <div style="background-color: #C14D34;"></div>
    <div></div>
  </div>
  <h3>Output Gradient Palette</h3>
  <div class="about-colour-gradient">
    <div style="background-color: #260A11;"></div>
    <div style="background-color: #4D151C;"></div>
    <div style="background-color: #741F21;"></div>
    <div style="background-color: #9A312A;"></div>
    <div style="background-color: #C14D34;"></div>
    <div style="background-color: #D27A58;"></div>
    <div style="background-color: #DDA482;"></div>
    <div style="background-color: #E9C9AB;"></div>
    <div style="background-color: #F4E7D5;"></div>
  </div>
  <h2>How to use</h2>
  <p>To use this plugin, go into paint mode and change the colour palette mode to <strong>Palette</strong> or <strong>Both</strong>. You can then select the <strong>Generate Colour Gradient</strong> button <i class="icon material-icons" style="translate:0 5px;">gradient</i> to start creating your gradient palette.</p>
</div>
<div id="about-markdown-links">
  <a href="https://alpinebuster.top/">
    <i class="material-icons icon" style="color: #33E38E;">language</i>
    <p>By alpinebuster</p>
  </a>
  <a href="https://chat.alpinebuster.top/">
    <i class="fa_big icon fas fa-comment-dots" style="color: #727FFF;"></i>
    <p>Chat Server</p>
  </a>
</div>
</div>