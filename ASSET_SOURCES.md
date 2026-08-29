# Asset sources

This file records the provenance available for the local visual assets used by the V3 prototype. The preserved archive remains byte-for-byte unchanged.

## Supplied V3 image set

The seven supplied originals are preserved in the existing `image-redesign/` folder. Their macOS download metadata identifies Pexels as the source. The photographer names below are taken from the `dl=pexels-…` attribution in each original download URL; `c.jpg` also contains conflicting embedded XMP credit and should be checked with the owner before launch.

| Intended use | Original file | Original source URL | Photographer | Optimized derivatives |
| --- | --- | --- | --- | --- |
| Hero 1 | `image-redesign/1.jpg` · 6730×4487 | [Pexels original](https://images.pexels.com/photos/32176066/pexels-photo-32176066.jpeg?cs=srgb&dl=pexels-kenzero14-32176066.jpg&fm=jpg&_gl=1*nwck24*_ga*MTM0MDg5MTU5MS4xNzg4MDI3OTk5*_ga_8JE65Q40S6*czE3ODgwMjc5OTkkbzEkZzAkdDE3ODgwMjc5OTkkajYwJGwwJGgw) | Ken Zero (`kenzero14`) | `public/assets/redesign/hero-1.webp` + `.avif` |
| Hero 2 | `image-redesign/2.jpg` · 3024×4032 | [Pexels original](https://images.pexels.com/photos/36014685/pexels-photo-36014685.jpeg?cs=srgb&dl=pexels-artem-korolev-2159253660-36014685.jpg&fm=jpg) | Artem Korolev (`artem-korolev`) | `public/assets/redesign/hero-2.webp` + `.avif` |
| Hero 3 | `image-redesign/3.jpg` · 5984×7984 | [Pexels original](https://images.pexels.com/photos/34231701/pexels-photo-34231701.jpeg?cs=srgb&dl=pexels-krzysztof-2156488251-34231701.jpg&fm=jpg) | Krzysztof (`krzysztof`) | `public/assets/redesign/hero-3.webp` + `.avif` |
| Service 1 | `image-redesign/a.jpg` · 6000×4000 | [Pexels original](https://images.pexels.com/photos/35130738/pexels-photo-35130738.jpeg?cs=srgb&dl=pexels-peter-xie-371876898-35130738.jpg&fm=jpg) | Peter Xie (`peter-xie`) | `public/assets/redesign/service-a.webp` + `.avif` |
| Service 2 | `image-redesign/b.jpg` · 2752×4891 | [Pexels original](https://images.pexels.com/photos/16340979/pexels-photo-16340979.jpeg?cs=srgb&dl=pexels-abdielvx-16340979.jpg&fm=jpg) | Abdielvx (`abdielvx`) | `public/assets/redesign/service-b.webp` + `.avif` |
| Service 3 | `image-redesign/c.jpg` · 6219×4146 | [Pexels original](https://images.pexels.com/photos/7979435/pexels-photo-7979435.jpeg?cs=srgb&dl=pexels-kindelmedia-7979435.jpg&fm=jpg) | Kindel Media (`kindelmedia`); embedded XMP says “olga asotskaya” | `public/assets/redesign/service-c.webp` + `.avif` |
| Service 4 | `image-redesign/d.jpg` · 6240×4160 | [Pexels original](https://images.pexels.com/photos/16108906/pexels-photo-16108906.jpeg?cs=srgb&dl=pexels-rrodriguesim-16108906.jpg&fm=jpg&_gl=1*1doyeka*_ga*MTM0MDg5MTU5MS4xNzg4MDI3OTk5*_ga_8JE65Q40S6*czE3ODgwMjc5OTkkbzEkZzEkdDE3ODgwMjgyMzMkajQ1JGwwJGgw) | Rrodriguesim (`rrodriguesim`) | `public/assets/redesign/service-d.webp` + `.avif` |

The WebP derivatives are the application sources; the AVIF derivatives are retained for a future explicit art-directed `<picture>` path and for delivery tooling. The originals remain untouched.

## Archived fallback photography used by the prototype

These are existing downloads from the authentic archive and remain in use for the organisation section. The archive inventory does not identify a photographer.

| Local file | Current use | Original source URL | Photographer |
| --- | --- | --- | --- |
| `public/assets/photoas1.jpg` | Existing archive fallback retained only where needed | [PHOTOAS1.jpg](https://aeroports-services.fr/wp-content/uploads/2017/05/PHOTOAS1.jpg) | Not stated in the archive |
| `public/assets/photoas11.jpg` | Organisation section | [PHOTOAS11.jpg](https://aeroports-services.fr/wp-content/uploads/2017/05/PHOTOAS11.jpg) | Not stated in the archive |

The source references above are reproduced from `reference/original-aeroports-services/inventory/CONTENT_REPORT.md` and the archived page captures. The original archive itself is read-only reference material.

## Footer logo

No owner-approved white `SERVICES` master was found in the supplied image folder or the archive. The footer therefore uses the byte-identical archived raster `public/assets/logo-aeroports-sevices.png` on a restrained light logo plate. The reconstructed logo variants present in the worktree are not used.
