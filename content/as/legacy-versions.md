---
title: Legacy Versions
description: AS version history and changelogs prior to switching to Github Releases
---

# Legacy Versions

This page lists the versions and changelogs prior to switching to Github Releases.

<p style="padding: 4px 10px;
	border: 1px solid #e88080;
	background-color: #ffdede;
	color: black;"><b>Warning: </b> This page is no longer updated!</p>
<p>You can find the latest AS updates on <a href="https://github.com/alpinebuster/as/releases">github.com/alpinebuster/as/releases</a>.</p>

<h3><span class="ez-toc-section" id="341"></span>3.4.1<span class="ez-toc-section-end"></span></h3>
10 Mar 2020
<h5>Bugfixes</h5>
<ul>
	<li>Textures in UV Editor don’t update correctly when replacing textures</li>
	<li>Issue with keyframe order in the glTF exporter</li>
	<li>Axis control gizmo centers a frame too late in animations</li>
	<li>Panda skin model does not load</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/540">#540</a></span>&nbsp;Small Movement offsets after opening display menu</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/541">#541</a></span>&nbsp;Right clicking a cube and making it hidden on animation tab has no use</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/542">#542</a></span>&nbsp;Editing a texture externally breaks its UV editor</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/544">#544</a></span>&nbsp;Texture reset when load .asmodel</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/545">#545</a></span>&nbsp;Perspective view grid isn’t hidden when on paint mode</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/546">#546</a></span>&nbsp;Odd behaviour with large brush/eraser scales</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/547">#547</a></span>&nbsp;Axis control wont change position when moving a locator</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/549">#549</a></span>&nbsp;Loading cubes with UV defined for any face breaks other faces without UV</li>
</ul>
<h5>Downloads</h5>
<ul class="list">
 	<li><a class="link" href="https://ai-stomatology.tech/downloads/#v3.4.1">Download Page</a></li>
</ul>

<h3><span class="ez-toc-section" id="340_-_The_Paint_Tool_Update"></span>3.4.0 – The Paint Tool Update<span class="ez-toc-section-end"></span></h3>
4 Mar 2020
<h5>Changes</h5>
<ul>
	<li>Added Rectangle/Circle paint tool</li>
	<li>Added texture selection and copy/paste tool</li>
	<li>Added mirror paint option</li>
	<li>Added glTF export format</li>
	<li>Added Camera Angle Presets</li>
	<li>Added mute toggle for animation channels</li>
	<li>New Transform Space selector</li>
	<li>Added length modes to GIF Recorder</li>
	<li>Extended Paint Bucket color mode: Global Colors and Connected Colors</li>
	<li>Added support for more palette formats: ACT, ACO, ASE</li>
	<li>Removed .bbpalette export in favor of more common .gpl palette format</li>
	<li>Added two new palette presets</li>
	<li>Unlocked animations for Free format</li>
	<li>Added buttons to scale tool to scale around element pivot or selection center</li>
	<li>Keybindings are now displayed in description tooltips</li>
	<li>Restyled toolbar select widget</li>
	<li>Added new Skin Mode templates: Evocation Fang, Hoglin, Piglin, Chest, Bell, Blaze</li>
	<li>Base grid is now hidden in Paint mode</li>
	<li>Removed noise brush option</li>
	<li>Added Shading toggle to the view menu</li>
	<li>New icon for Move tool</li>
	<li>Added new settings category “Interface”</li>
	<li>Added Developer submenu</li>
	<li>Added more event hooks</li>
	<li>Updated to Electron 8.0.2</li>
	<li>Updated to Three.JS 114</li>
	<li>Various performance improvements</li>
</ul>
<h5>Bugfixes</h5>
<ul>
	<li>GIF recorder renders black colors as transparent</li>
	<li>Exported GIFs have a black outline</li>
	<li>Drag handler extensions are case sensitive</li>
	<li>Drag handlers don’t read binary files correctly</li>
	<li>Number Sliders use cube grid resolution by default</li>
	<li>Confirm button in pop-up color pickers is offset</li>
	<li>Transform gizmo visually messes up after using rescale gizmo</li>
	<li>Cannot use phantom model template in Skin Mode</li>
	<li>UV mapping issue when generating templates</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/508">#508</a></span>&nbsp;Gif Compression</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/517">#517</a></span>&nbsp;Project Resolution for 2nd Template Textures</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/521">#521</a></span>&nbsp;Nothing is rendering.</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/524">#524</a></span>&nbsp;When opening a .asmodel with multiple textures, assigned textures are reset</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/527">#527</a></span>&nbsp;Saved as text background box doesn’t scale depending on name length</li>
	<li><span class="text-gray-light"><a class="link-gray-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/alpinebuster/as/issues/528">#528</a></span>&nbsp;Setting cull face to None causes it to immediately reset when UV editor is closed</li>
</ul>
<h5>Downloads</h5>
<ul class="list">
 	<li><a class="link" href="https://ai-stomatology.tech/downloads/#v3.4.0">Download Page</a></li>
</ul>
