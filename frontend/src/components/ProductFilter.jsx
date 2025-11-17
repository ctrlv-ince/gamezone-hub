import React from 'react';
import { Box, TextField, MenuItem, Slider, Typography, Button, Chip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';

const ProductFilter = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSliderChange = (e, newValue) => {
    onFilterChange({ ...filters, priceRange: `${newValue[0]}-${newValue[1]}` });
  };

  const handleClearFilters = () => {
    onFilterChange({ category: '', rating: '', priceRange: '0-1000' });
  };

  const priceValues = filters.priceRange ? filters.priceRange.split('-').map(Number) : [0, 1000];
  const hasActiveFilters = filters.category || filters.rating || (priceValues[0] !== 0 || priceValues[1] !== 1000);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(37, 42, 69, 0.9) 100%)',
        border: '1px solid rgba(139, 0, 255, 0.3)',
        borderRadius: 2,
        p: 3,
        mb: 4,
        boxShadow: '0 8px 32px rgba(139, 0, 255, 0.2)',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        pb: 2,
        borderBottom: '1px solid rgba(139, 0, 255, 0.3)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterListIcon sx={{ color: '#00d4ff', fontSize: 28 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}
          >
            Filters
          </Typography>
          {hasActiveFilters && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, rgba(139, 0, 255, 0.3) 0%, rgba(0, 212, 255, 0.3) 100%)',
                color: '#00d4ff',
                border: '1px solid rgba(139, 0, 255, 0.5)',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              }
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Filters Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3 
      }}>
        {/* Category Filter */}
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 1.5,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            Category
          </Typography>
          <TextField
            name="category"
            value={filters.category || ''}
            onChange={handleInputChange}
            select
            fullWidth
            placeholder="All Categories"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '& fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8b00ff',
                  boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                },
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
            SelectProps={{
              displayEmpty: true,
              MenuProps: {
                PaperProps: {
                  sx: {
                    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(37, 42, 69, 0.98) 100%)',
                    border: '1px solid rgba(139, 0, 255, 0.3)',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 0, 255, 0.2)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(139, 0, 255, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 0, 255, 0.4)',
                        }
                      }
                    }
                  }
                }
              }
            }}
          >
            <MenuItem value=""><em>All Categories</em></MenuItem>
            <MenuItem value="PS4 Games">🎮 PS4 Games</MenuItem>
            <MenuItem value="Xbox Games">🎮 Xbox Games</MenuItem>
            <MenuItem value="Consoles">🕹️ Consoles</MenuItem>
            <MenuItem value="Nintendo Switch Games">🎮 Nintendo Switch Games</MenuItem>
            <MenuItem value="Accessories">🎧 Accessories</MenuItem>
            <MenuItem value="PC Games">💻 PC Games</MenuItem>
            <MenuItem value="PS5 Games">🎮 PS5 Games</MenuItem>
            <MenuItem value="Digital Games">📦 Digital Games</MenuItem>
          </TextField>
        </Box>

        {/* Rating Filter */}
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 1.5,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            Minimum Rating
          </Typography>
          <TextField
            name="rating"
            type="number"
            value={filters.rating || ''}
            onChange={handleInputChange}
            fullWidth
            placeholder="Any rating"
            inputProps={{ min: 0, max: 5, step: 0.5 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '& fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(139, 0, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8b00ff',
                  boxShadow: '0 0 10px rgba(139, 0, 255, 0.3)'
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
              }
            }}
            InputProps={{
              endAdornment: filters.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#fbbf24', mr: 1 }}>
                  <StarIcon sx={{ fontSize: 20 }} />
                </Box>
              )
            }}
          />
          {filters.rating && (
            <Typography 
              sx={{ 
                color: '#fbbf24', 
                fontSize: '0.75rem',
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <StarIcon sx={{ fontSize: 14 }} />
              {filters.rating}+ stars and above
            </Typography>
          )}
        </Box>

        {/* Price Range Filter */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.75rem'
              }}
            >
              Price Range
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#00d4ff', 
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              ₱{priceValues[0]} - ₱{priceValues[1]}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(139, 0, 255, 0.3)',
              borderRadius: 1,
              p: 2,
              pt: 3,
            }}
          >
            <Slider
              value={priceValues}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              sx={{
                color: '#8b00ff',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#00d4ff',
                  border: '2px solid #8b00ff',
                  width: 20,
                  height: 20,
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(139, 0, 255, 0.3)',
                  },
                },
                '& .MuiSlider-track': {
                  background: 'linear-gradient(90deg, #8b00ff 0%, #00d4ff 100%)',
                  border: 'none',
                  height: 6,
                },
                '& .MuiSlider-rail': {
                  backgroundColor: 'rgba(139, 0, 255, 0.2)',
                  height: 6,
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#8b00ff',
                  borderRadius: 1,
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
              ₱0
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
              ₱1000+
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFilter;