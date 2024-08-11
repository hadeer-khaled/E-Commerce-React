import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const CategoryCard= ({category , image})=> {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://odoo-community.org/web/image/product.template/3936/image_1024?unique=d43a8c5"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {category.title}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink to ={ `${category.id}/show`}>See products</NavLink>
      </CardActions>
    </Card>
  );
}
export default CategoryCard
