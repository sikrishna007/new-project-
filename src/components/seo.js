import Head from 'next/head';
import PropTypes from 'prop-types';

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + ' | Event Mart'
    : 'Devias Kit PRO';

  return (
    <Head>
      <title>
        {fullTitle}
      </title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string
};
