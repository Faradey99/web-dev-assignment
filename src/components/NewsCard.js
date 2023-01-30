import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function NewsCard({ title, description, url, urlToImage }) {
  const fullWidth = { height: '100%', width: '100%' };

  return (
    <Card sx={fullWidth}>
      <CardActionArea href={url} sx={fullWidth}>
        <CardMedia
          component="img"
          height="150"
          image={urlToImage}
          alt={title}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{ title }</Typography>

          <Typography variant="body2" color="text.secondary">{ description }</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
}
