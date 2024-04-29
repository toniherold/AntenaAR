const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/targets.mind',
        });

        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const dengue = await loadGLTF("./assets/models/mosquito/scene.gltf");
        dengue.scene.scale.set(1, 1, 1);
        dengue.scene.position.set(0, 0, 0);

        const dengueAnchor = mindarThree.addAnchor(0);
        dengueAnchor.group.add(dengue.scene);

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});