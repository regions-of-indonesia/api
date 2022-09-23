[![](./public/Cover.png)](https://regions-of-indonesia.netlify.app)

<p align="center">
  <a href="https://indonesia-api.netlify.app/regions-of-indonesia"><img src="https://raw.githubusercontent.com/indonesia-api/indonesia-api/main/public/Badge.svg?sanitize=true" /></a>
</p>

# Regions of Indonesia

Regions of Indonesia

## Features

- Support both [Dynamic API](https://github.com/regions-of-indonesia/api) & [Static API](https://github.com/regions-of-indonesia/static-api)
- Search API for Dynamic API
- [Javascript client SDK](https://github.com/regions-of-indonesia/client)
- Documented with in-app [DEMO](https://regions-of-indonesia.netlify.app)

## Roadmap

- [x] Plain data
- [x] Dynamic API & Static API
- [x] Javascript Client SDK
- [ ] Documentation
- [ ] PHP Client SDK
- [ ] Dart Client SDK
- [ ] Python Client SDK

## Types

```typescript
type CodeName = {
  code: string;
  name: string;
};

type SearchResult = {
  provinces: CodeName[];
  districts: CodeName[];
  subdistricts: CodeName[];
  villages: CodeName[];
};
```

## Endpoints

### Dynamic API

| Endpoint                                                                                                         | Return type  |
| ---------------------------------------------------------------------------------------------------------------- | ------------ |
| [/provinces](https://regions-of-indonesia-flamrdevs.koyeb.app/provinces)                                         | CodeName[]   |
| [/province/11](https://regions-of-indonesia-flamrdevs.koyeb.app/province/11)                                     | CodeName     |
| [/province/11/districts](https://regions-of-indonesia-flamrdevs.koyeb.app/province/11/districts)                 | CodeName     |
| [/districts/11](https://regions-of-indonesia-flamrdevs.koyeb.app/districts/11)                                   | CodeName[]   |
| [/district/11.01](https://regions-of-indonesia-flamrdevs.koyeb.app/district/11.01)                               | CodeName     |
| [/district/11.01/subdistricts](https://regions-of-indonesia-flamrdevs.koyeb.app/district/11.01/subdistricts)     | CodeName     |
| [/subdistricts/11.01](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistricts/11.01)                       | CodeName[]   |
| [/subdistrict/11.01.01](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistrict/11.01.01)                   | CodeName     |
| [/subdistrict/11.01.01/villages](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistrict/11.01.01/villages) | CodeName     |
| [/villages/11.01.01](https://regions-of-indonesia-flamrdevs.koyeb.app/villages/11.01.01)                         | CodeName[]   |
| [/village/11.01.01.2001](https://regions-of-indonesia-flamrdevs.koyeb.app/village/11.01.01.2001)                 | CodeName     |
| [/search?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search?text=aceh)                           | SearchResult |
| [/search/provinces?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/provinces?text=aceh)       | CodeName[]   |
| [/search/districts?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/districts?text=aceh)       | CodeName[]   |
| [/search/subdistricts?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/subdistricts?text=aceh) | CodeName[]   |
| [/search/villages?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/villages?text=aceh)         | CodeName[]   |

## Support

- Donate [Ko-Fi](https://ko-fi.com/flamrdevs) or [Trakteer](https://trakteer.id/flamrdevs)

## LICENSE

GPL-3.0
