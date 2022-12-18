[![cover]][site]

<p align="center">
  <a href="https://indonesia-api.netlify.app/regions-of-indonesia"><img src="https://raw.githubusercontent.com/indonesia-api/indonesia-api/main/public/Badge.svg?sanitize=true" /></a>
</p>

<img src="https://hiiits.deta.dev/hit/regions-of-indonesia/api?" width="100%" heigth="10px" />

# Regions of Indonesia

Regions of Indonesia

## Features

- Integrated with [Javascript client][github:client]

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

| Endpoint                                                                                              | Return type  |
| ----------------------------------------------------------------------------------------------------- | ------------ |
| [/provinces](https://regions-of-indonesia.deta.dev/provinces)                                         | CodeName[]   |
| [/province/11](https://regions-of-indonesia.deta.dev/province/11)                                     | CodeName     |
| [/province/11/districts](https://regions-of-indonesia.deta.dev/province/11/districts)                 | CodeName[]   |
| [/districts/11](https://regions-of-indonesia.deta.dev/districts/11)                                   | CodeName[]   |
| [/district/11.01](https://regions-of-indonesia.deta.dev/district/11.01)                               | CodeName     |
| [/district/11.01/subdistricts](https://regions-of-indonesia.deta.dev/district/11.01/subdistricts)     | CodeName[]   |
| [/subdistricts/11.01](https://regions-of-indonesia.deta.dev/subdistricts/11.01)                       | CodeName[]   |
| [/subdistrict/11.01.01](https://regions-of-indonesia.deta.dev/subdistrict/11.01.01)                   | CodeName     |
| [/subdistrict/11.01.01/villages](https://regions-of-indonesia.deta.dev/subdistrict/11.01.01/villages) | CodeName[]   |
| [/villages/11.01.01](https://regions-of-indonesia.deta.dev/villages/11.01.01)                         | CodeName[]   |
| [/village/11.01.01.2001](https://regions-of-indonesia.deta.dev/village/11.01.01.2001)                 | CodeName     |
| [/search?text=aceh](https://regions-of-indonesia.deta.dev/search?text=aceh)                           | SearchResult |
| [/search/provinces?text=aceh](https://regions-of-indonesia.deta.dev/search/provinces?text=aceh)       | CodeName[]   |
| [/search/districts?text=aceh](https://regions-of-indonesia.deta.dev/search/districts?text=aceh)       | CodeName[]   |
| [/search/subdistricts?text=aceh](https://regions-of-indonesia.deta.dev/search/subdistricts?text=aceh) | CodeName[]   |
| [/search/villages?text=aceh](https://regions-of-indonesia.deta.dev/search/villages?text=aceh)         | CodeName[]   |

## Support

[![][support:ko-fi-button]][support:ko-fi]

[![][support:trakteer-button]][support:trakteer]

## LICENSE

GPL-3.0

[cover]: https://raw.githubusercontent.com/regions-of-indonesia/regions-of-indonesia/main/public/Cover.png?sanitize=true
[site]: https://regions-of-indonesia.netlify.app
[docs]: https://regions-of-indonesia-docs.netlify.app
[github:api]: https://github.com/regions-of-indonesia/api
[github:static-api]: https://github.com/regions-of-indonesia/static-api
[github:site]: https://github.com/regions-of-indonesia/site
[github:docs]: https://github.com/regions-of-indonesia/docs
[github:client]: https://github.com/regions-of-indonesia/client
[github:data]: https://github.com/regions-of-indonesia/data
[github:php-client]: https://github.com/regions-of-indonesia/php-client
[github:dart-client]: https://github.com/regions-of-indonesia/dart-client
[github:python-client]: https://github.com/regions-of-indonesia/python-client
[github:swr]: https://github.com/regions-of-indonesia/swr
[github:react-query]: https://github.com/regions-of-indonesia/react-query
[github:solid-query]: https://github.com/regions-of-indonesia/solid-query
[github:example-react-ts]: https://github.com/regions-of-indonesia/example-react-ts
[github:example-react-ts-swr]: https://github.com/regions-of-indonesia/example-react-ts-swr
[github:example-react-ts-query]: https://github.com/regions-of-indonesia/example-react-ts-query
[github:example-solid-ts]: https://github.com/regions-of-indonesia/example-solid-ts
[github:example-solid-ts-query]: https://github.com/regions-of-indonesia/example-solid-ts-query
[support:ko-fi]: https://ko-fi.com/flamrdevs
[support:ko-fi-button]: https://flamrdevs.vercel.app/ko-fi.png
[support:trakteer]: https://trakteer.id/flamrdevs
[support:trakteer-button]: https://flamrdevs.vercel.app/trakteer.png
