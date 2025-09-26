// Based off of https://github.com/alpinebuster/as-plugins/blob/master/plugins/animation_to_java.js
(function () {
    var menuButton;

    ASPlugin.register("animation_to_json", {
        title: "Animation to JSON Converter",
        author: "alpinebuster",
        description: "Converts AS animations to the JSON format for the NeoForge mod loader",
        icon: "fa-cube",
        tags: ["Animation", "Editions"],
        variant: "both",
        version: "1.0.1",
        onload() {
            Formats.modded_entity.animation_mode = true;
            menuButton = new Action("export_animation_to_json", {
                name: "Export Animations to JSON",
                description: "Export Animations to JSON format",
                icon: "fa-file-export",
                condition: () => AS_FORMAT.animation_mode,
                click() {
                    const animation = Animation.selected;
                    if (animation == null) return;
                    AS.export({
                        type: "Json Files",
                        extensions: ["json"],
                        name: `${animation.name.replaceAll(".", "_").replace("animation_", "")}.json`,
                        resource_id: "json_entity_animation",
                        savetype: "text",
                        content: JSON.stringify(generateJson(animation))
                    });
                }
            });
            MenuBar.addAction(menuButton, "file.export");
        },
        onunload() {
            menuButton.delete();
        }
    });

    function generateJson(animation) {
        const result = {
            length: animation.length,
            animations: []
        };
        if (animation.loop == "loop") {
            result.loop = true;
        }
        for (const id in animation.animators) {
            const boneAnimator = animation.animators[id];
            if (!(boneAnimator instanceof BoneAnimator)) continue;
            if (boneAnimator.position.length) {
                result.animations.push(generateKeyframes(boneAnimator.name, "position", boneAnimator.position));
            }
            if (boneAnimator.rotation.length) {
                result.animations.push(generateKeyframes(boneAnimator.name, "rotation", boneAnimator.rotation));
            }
            if (boneAnimator.scale.length) {
                result.animations.push(generateKeyframes(boneAnimator.name, "scale", boneAnimator.scale));
            }
        }
        return result;
    }

    function generateKeyframes(bone, target, keyframes) {
        const animData = {
            bone,
            target,
            keyframes: []
        };
        for (const keyframe of [...keyframes].sort((a, b) => a.time - b.time)) {
            animData.keyframes.push({
                timestamp: keyframe.time,
                target: [
                    keyframe.get("x"),
                    keyframe.get("y"),
                    keyframe.get("z"),
                ],
                interpolation: keyframe.interpolation
            });
        }
        return animData;
    }
})();
