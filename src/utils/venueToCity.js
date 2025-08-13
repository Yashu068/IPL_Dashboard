// Program to convert venue to city

export const venueToCity = (venue)=>{
  const map = {
    'Wankhede Stadium': 'Mumbai',
    'Eden Gardens': 'Kolkata',
    'Arun Jaitley Stadium': 'Delhi',
    'M. A. Chidambaram Stadium': 'Chennai',
    'Narendra Modi Stadium': 'Ahmedabad'
  }
  return map[venue] || venue
}

