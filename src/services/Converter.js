// used for reading months
const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function replaceAngleBrackets(data) {
  const newData = {};
  newData.authors = data.authors.map(author => author.replace(/</g, '&lt;'));
  newData.date = data.datePublished || undefined;
  newData.publisher = data.publisher ? data.publisher.replace(/</g, '&lt;') : undefined;
  newData.website = data.website ? data.website.replace(/</g, '&lt;') : undefined;
  newData.title = data.article ? data.article.replace(/</g, '&lt;') : undefined;
  newData.dateAccessed = data.dateRetrieved || undefined;
  newData.url = data.url ? data.url.replace(/</g, '&lt;') : '';
  return newData;
}

export function toAPA(data) {
  let citation = '';
  const {
    authors, date, publisher, title, dateAccessed, url
  } = replaceAngleBrackets(data);
  const author = authors[0];

  if (author) {
    const nameArr = author.split(' ');
    if (nameArr.length === 1) {
      citation += `${nameArr[0]}. `;
    } else {
      citation += `${nameArr[nameArr.length - 1]}, `;
      for (let i = 0; i < nameArr.length - 1; ++i) {
        const currFirstMiddleName = nameArr[i];
        citation += `${currFirstMiddleName[0]}. `;
      }
    }
  } else if (title) {
    const italicizedTitle = title.italics();
    citation += `${italicizedTitle}. `;
  }
  if (date) {
    const longDate = new Date(date);
    citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()}). `;
  }
  if (author && title) {
    citation += `${title.italics()}. `;
  }
  if (publisher) {
    citation += `${publisher}. `;
  }
  citation += 'Retrieved ';
  if (dateAccessed) {
    const longDate = new Date(dateAccessed);
    citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()})`;
  }
  if (url) {
    citation += `, from ${url}`;
  }
  return citation;
}

export function toMLA(data) {
  let citation = '';
  const {
    authors, date, publisher, website, title, url
  } = replaceAngleBrackets(data);
  const author = authors[0];

  if (author) {
    const nameArr = author.split(' ');
    if (nameArr.length === 1) {
      citation += `${nameArr[0]}. `;
    } else {
      citation += `${nameArr[nameArr.length - 1]},`;
      for (let i = 0; i < nameArr.length - 1; ++i) {
        citation += ` ${nameArr[i]}`;
      }
      citation += '. ';
    }
  }
  if (title) {
    citation += `"${title}." `;
  }
  if (website) {
    citation += `${website.italics()}, `;
  }
  if (publisher) {
    citation += `${publisher}, `;
  }
  if (date) {
    const longDate = new Date(date);
    citation += `${longDate.getDate()} ${monthName[longDate.getMonth()]} ${longDate.getFullYear()}, `;
  }
  if (url) {
    citation += `${url}`;
  } else if (citation.substring(citation.length - 2) === ', ') {
    citation = citation.substring(0, citation.length - 2);
  }
  citation += '.';
  return citation;
}

/*! Chicago Citation Style

Last Name, First Name. “Page Title.” Website Title. Web Address
(retrieved Date Accessed).

Smith, John. “Obama inaugurated as President.” CNN.com.
http://www.cnn.com/POLITICS/01/21/obama_inaugurated/index.html
(accessed February 1, 2009).

Notes:
- Do not use initials for names
- If no author, use publisher
- If no website, use publisher
- If no title, come up with your own descriptive title
- If the website has a print counterpart (i.e. newspaper), put website
in italics

http://www.bibme.org/citation-guide/chicago/website/
*/

export function toChicago(data) {
  let citation = '';
  const {
    authors, date, publisher, website, title, dateAccessed, url
  } = replaceAngleBrackets(data);
  const author = authors[0];

  if (author) {
    const nameArr = author.split(' ');
    if (nameArr.length === 1) {
      citation += `${nameArr[0]}. `;
    } else {
      citation += `${nameArr[nameArr.length - 1]}, `;
      const firstName = nameArr[0];
      citation += `${firstName}`;
      for (let i = 1; i < nameArr.length - 1; ++i) {
        const currMiddleName = nameArr[i];
        citation += ` ${currMiddleName}`;
      }
      citation += '. ';
    }
  } else if (publisher) {
    citation += ` ${publisher}. `;
  }
  if (title) {
    citation += `"${title}." `;
  }
  if (website) {
    citation += `${website}. `;
  } else if (publisher) {
    citation += `${publisher}. `;
  }
  if (date) {
    const longDate = new Date(date);
    citation += `${monthName[longDate.getMonth()]} ${longDate.getDate()}, ${longDate.getFullYear()}. `;
  }
  if (url) {
    citation += `${url} `;
  }
  if (dateAccessed) {
    citation += '(Accessed ';
    const longDate = new Date(dateAccessed);
    citation += `${monthName[longDate.getMonth()]} ${longDate.getDate()}, ${longDate.getFullYear()})`;
  }

  if (citation.substring(citation.length - 1) === ' ') {
    citation = citation.substring(0, citation.length - 1);
  }
  if (citation.substring(citation.length - 1) !== '.') {
    citation += '.';
  }

  return citation;
}

/*! Harvard Citation Style

Author surname(s), initial(s). (Year of publishing)  Title of
page/site [Online]. Available at: URL (Accessed: day month year)

Mitchell, J.A. (2017) How and when to reference [Online]. Available
at: https://www.howandwhentoreference.com/ (Accessed: 27 May 2017)

https://www.mendeley.com/guides/harvard-citation-guide
*/

export function toHarvard(data) {
  let citation = '';
  const {
    authors, date, website, title, dateAccessed, url
  } = replaceAngleBrackets(data);
  const author = authors[0];

  if (author) {
    const nameArr = author.split(' ');
    if (nameArr.length === 1) {
      citation += `${nameArr[0]}. `;
    } else {
      citation += `${nameArr[nameArr.length - 1]}, `;
      const firstName = nameArr[0];
      citation += `${firstName[0]}. `;
      for (let i = 1; i < nameArr.length - 1; ++i) {
        const currMiddleName = nameArr[i];
        citation += `${currMiddleName[0]}. `;
      }
    }
  } else if (title) {
    citation += `${title.italics()} `;
  } else if (website) {
    citation += `${website.italics()}`;
  }
  if (date) {
    const longDate = new Date(date);
    citation += `(${longDate.getFullYear()}) `;
  }
  if (author && title) {
    citation += `${title.italics()} `;
  } else if (author && website) {
    citation += `${website.italics()}`;
  }
  citation += '[Online]. ';
  if (url) {
    citation += `Available at: ${url} `;
  }
  if (dateAccessed) {
    citation += '(Accessed ';
    const longDate = new Date(dateAccessed);
    citation += `${longDate.getDate()} ${monthName[longDate.getMonth()]} ${longDate.getFullYear()})`;
  }

  return citation;
}
