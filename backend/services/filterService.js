let filter;

async function getFilter() {
  if (!filter) {
    const { default: Filter } = await import('bad-words');
    filter = new Filter();
  }
  return filter;
}

module.exports = { getFilter };