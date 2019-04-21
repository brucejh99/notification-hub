/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

// used for reading months
const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Takes the citation data and replaces angle brackets to prevent html tags from
// displaying, also removes empty author strings
function replaceAngleBrackets(data) {
  const newData = {};
  newData.authors = data.authors.filter(author => author.length > 0)
    .map(author => author.replace(/</g, '&lt;'));
  newData.date = data.datePublished || undefined;
  newData.publisher = data.publisher ? data.publisher.replace(/</g, '&lt;') : undefined;
  newData.website = data.website ? data.website.replace(/</g, '&lt;') : undefined;
  newData.title = data.article ? data.article.replace(/</g, '&lt;') : undefined;
  newData.dateAccessed = data.dateRetrieved || undefined;
  newData.url = data.url ? data.url.replace(/</g, '&lt;') : '';
  return newData;
}

/**
 * Formats an author for APA
 * @param {String} author Unformatted author as 'FirstName MiddleNames LastName'
 * @returns {String} Formatted string for multiple authors
 */
function formatAuthorLastFirstInitial(author) {
  let authorString = '';

  const nameArr = author.split(' ');
  if (nameArr.length === 1) {
    authorString += `${nameArr[0]}.`;
  } else {
    authorString += `${nameArr[nameArr.length - 1]}, `;
    for (let i = 0; i < nameArr.length - 1; i++) {
      const currFirstMiddleName = nameArr[i];
      authorString += `${currFirstMiddleName[0]}.`;
      if (i < nameArr.length - 2) {
        authorString += ' ';
      }
    }
  }
  return authorString;
}

/*!
Single Author
  Last name first, followed by author initials.
  Berndt, T. J.
Two Authors
  List by their last names and initials. Use the ampersand instead of "and."
  Wegener, D. T., & Petty, R. E.
Three to Seven Authors
  List by last names and initials; commas separate author names,
    while the last author name is preceded again by ampersand.
  Kernis, M. H., Cornell, D. P., Sun, C. R., Berry, A., Harlow, T., & Bach, J. S.
More Than Seven Authors
  List by last names and initials; commas separate author names.
    After the sixth author's name, use an ellipsis in place of the author names.
    Then provide the final author name. There should be no more than seven names.
  Miller, F. H., Choi, M. J., Angeli, L. L., Harland, A. A.,
  Stamos, J. A., Thomas, S. T., . . . Rubin, L. H.

  https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_author_authors.html
*/

/**
 * Formats multiple authors for APA
 * @param {Array} authors Array of author strings
 * @returns {String} Formatted string for multiple authors
 */
function formatAuthorsAPA(authors) {
  let authorsString = '';

  for (let i = 0; i < 6 && i < authors.length; i++) {
    authorsString += formatAuthorLastFirstInitial(authors[i]);
    if (i !== 5 && i !== authors.length - 1) {
      authorsString += ', ';
    }
  }

  if (authors.length === 7) {
    authorsString += `, ${formatAuthorLastFirstInitial(authors[6])}`;
  } else if (authors.length > 7) {
    authorsString += `, . . . ${formatAuthorLastFirstInitial(authors[authors.length - 1])}`;
  }

  authorsString += ' ';
  return authorsString;
}

/**
 * Formats a citation for APA
 * @param {Object} data Object with citation fields
 * @returns {String} Formatted string for APA
 */
export function toAPA(data) {
  let citation = '';
  const {
    authors, date, publisher, title, dateAccessed, url,
  } = replaceAngleBrackets(data);

  if (authors.length > 0) {
    citation += formatAuthorsAPA(authors);
  } else if (title) {
    const italicizedTitle = title.italics();
    citation += `${italicizedTitle}. `;
  }
  if (date) {
    const longDate = new Date(date);
    citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()}). `;
  }
  if (authors.length > 0 && title) {
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

/*!
One author
  Courtois, Charles A.
Two authors
  Martin, Jonathan A., and Christopher Jackson.
Three or more authors
  Fontela, Pablo, et al.

https://sites.umuc.edu/library/libhow/mla_examples.cfm#authors
*/

/**
 * Formats multiple authors for MLA
 * @param {Array} authors Array of author strings
 * @returns {String} Formatted string for multiple authors
 */
function formatAuthorsMLA(authors) {
  let authorsString = '';

  if (authors.length > 0) {
    const nameArr = authors[0].split(' '); // Always format first author
    if (nameArr.length === 1) {
      authorsString += `${nameArr[0]}`;
    } else { // 'LastName, FirstName MiddleNames'
      authorsString += `${nameArr[nameArr.length - 1]},`;
      for (let i = 0; i < nameArr.length - 1; ++i) {
        authorsString += ` ${nameArr[i]}`;
      }
    }

    if (authors.length === 2) { // For second author, 'and FirstName SecondName'
      authorsString += `, and ${authors[1]}`;
    } else if (authors.length >= 3) { // For three or more, 'et al'
      authorsString += ', et al';
    }

    if (authorsString[authorsString.length - 1] !== '.') {
      authorsString += '.';
    }
    authorsString += ' ';
  }

  return authorsString;
}

/**
 * Formats a citation for MLA
 * @param {Object} data Object with citation fields
 * @returns {String} Formatted string for MLA
 */
export function toMLA(data) {
  let citation = '';
  const {
    authors, date, publisher, website, title, url,
  } = replaceAngleBrackets(data);

  if (authors.length > 0) {
    citation += formatAuthorsMLA(authors);
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
    authors, date, publisher, website, title, dateAccessed, url,
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
    authors, date, website, title, dateAccessed, url,
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
