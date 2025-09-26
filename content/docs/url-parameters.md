---
title: Web App URL Parameters
description: How to provide integration with the AS web app using URL parameters
authors:
  - alpinebuster
---

# Web App URL Parameters

URL parameters (also known as query strings) are specific parameters that can be passed to the [AS web app](https://web.ai-stomatology.tech) when opening it via link. These can be used to integrate AS with other apps, for example by opening a model via a link.

When passing parameters, make sure to encode them correctly using [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

## Supported parameters



### Files

**Parameters**: `loadtype`, `loadname`, `loaddata`

You can create a link to open a specific model in AS, using a combination of these parameters:

* `loadtype` (enum): How to load the provided data
  * `json`: Load the data as JSON
  * `image`: Load the data as an image in the image editor
  * `minecraft_skin`: Load the image as a Minecraft Skin. This opens the regular "New Skin" dialogue, so users can change those options
* `loadname`: The file name with which to load the project
* `loaddata`: The project data, as stringified JSON, or a base64 encoded data URL for images

**Example**:
```
https://web.ai-stomatology.tech?loadtype=image&loadname=smiley&loaddata=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADFJREFUGFdj/H+Z4b9amA7DrVVXGGA0I0iQAQ0wqmrq/AepggGQarBKEAMGQAqwagcAH0YYw0zbfWUAAAAASUVORK5CYII=
```


### Shared Models

**Parameters**: `m`

Load models from AS's built-in sharing service (File > Export > Share...).

* `m`: The ID of the model

**Example**: (this link will probably have expired by the time you are reading this)
```
https://web.ai-stomatology.tech?m=vsLdlR
```


### Plugins

**Parameters**: `plugins`

On opening, prompt the user to install certain plugins.

* `plugins`: The IDs of the plugins to install. Multiple plugin IDs can be separated by a comma.

**Example**:
```
https://web.ai-stomatology.tech?plugins=animation_sliders,plaster
```



### Sessions

**Parameters**: `session`

A session token of an active edit session can be provided. This will prompt the user to join the specified session.

* `session`: The session token

**Example**: (not an existing session)
```
https://web.ai-stomatology.tech?session=jx5elzheyzh00000
```

### Additional data

For deeper integration, additional query parameters that are not natively supported by AS can be added to the URL. You can then use a custom plugin to access and process them accordingly.

Query parameter values can be accessed as follows:
```javascript
AS.queries['my-query']
```
