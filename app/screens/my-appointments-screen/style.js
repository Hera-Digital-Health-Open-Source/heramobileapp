import {I18nManager, StyleSheet} from 'react-native';
import {color} from '../../theme';

const textAlign = I18nManager.isRTL ? 'right' : 'left';

const style = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  listItemContainer: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    marginVertical: 8,
    minHeight: 120,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemDate: {
    fontSize: 18,
    fontWeight: '700',
    color: color.primary,
  },
  itemEvent: {
    fontSize: 16,
    fontWeight: '700',
    color: color.black,
    textAlign: textAlign,
  },
  itemEventTarget: {
    fontSize: 16,
    fontWeight: '300',
    flex: 2,
  },
  findCentersBtn: {
    paddingHorizontal: 8,
  },
  markAsDoneBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  markAsDoneText: {
    color: color.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blankViewContainer: {
    alignSelf: 'center',
    marginTop: 80,
    paddingHorizontal: 16,
  },
  blankTitle: {
    color: '#777',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 29,
    textAlign: 'center',
  },
  blankDescription: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 29,
    textAlign: 'center',
    marginVertical: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default style;
