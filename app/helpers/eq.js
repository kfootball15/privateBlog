// This Helper allows us to make "if equals" conditional comparisons in our HTML
// https://emberigniter.com/how-to-equals-conditional-comparison-handlebars/
import Ember from 'ember';

const eq = (params) => params[0] === params[1];

export default Ember.Helper.helper(eq);
