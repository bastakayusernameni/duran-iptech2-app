import { StyleSheet } from 'react-native';

export const getAppStyles = (isDarkMode: boolean) => {
  const colors = isDarkMode
    ? {
        bg: '#070E1C',
        card: '#0F1A2E',
        card2: '#14213D',
        text: '#EAF0FB',
        subText: '#A0B9DC',
        muted: '#6B7FA3',
        border: '#1A2A45',
        gold: '#C8A55A',
        danger: '#E05A5A',
        success: '#3DDC97',
      }
    : {
        bg: '#F6F7FB',
        card: '#FFFFFF',
        card2: '#EEF2F7',
        text: '#101828',
        subText: '#475467',
        muted: '#667085',
        border: '#D0D5DD',
        gold: '#B78B2E',
        danger: '#D92D20',
        success: '#039855',
      };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },

    header: {
      paddingHorizontal: 18,
      paddingTop: 26,
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    headerTitle: {
      fontSize: 28,
      fontWeight: '900',
      color: colors.gold,
      letterSpacing: 4,
    },

    headerSubtitle: {
      color: colors.subText,
      marginTop: 2,
      fontSize: 13,
    },

    logoutButton: {
      backgroundColor: colors.card2,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },

    logoutButtonText: {
      color: colors.subText,
      fontSize: 13,
      fontWeight: '700',
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      marginHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '800',
      marginBottom: 14,
    },

    budgetCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      marginHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },

    budgetCardDanger: {
      borderColor: colors.danger,
    },

    budgetRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    budgetLabel: {
      color: colors.subText,
      fontSize: 13,
      fontWeight: '700',
    },

    budgetAmount: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '900',
      marginTop: 4,
    },

    editBudgetBtn: {
      backgroundColor: colors.card2,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },

    editBudgetText: {
      color: colors.gold,
      fontWeight: '800',
    },

    progressTrack: {
      height: 10,
      backgroundColor: colors.card2,
      borderRadius: 999,
      marginVertical: 18,
      overflow: 'hidden',
    },

    progressFill: {
      height: '100%',
      backgroundColor: colors.gold,
      borderRadius: 999,
    },

    progressDanger: {
      backgroundColor: colors.danger,
    },

    budgetStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    statLabel: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: '700',
    },

    statValue: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
      marginTop: 4,
    },

    dangerText: {
      color: colors.danger,
    },

    categoryScrollRow: {
      paddingLeft: 16,
      marginBottom: 16,
    },

    categoryChip: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
      padding: 14,
      marginRight: 10,
      minWidth: 105,
    },

    categoryChipIcon: {
      fontSize: 22,
      marginBottom: 8,
    },

    categoryChipLabel: {
      color: colors.subText,
      fontSize: 12,
      fontWeight: '700',
    },

    categoryChipAmount: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '900',
      marginTop: 4,
    },

    input: {
      backgroundColor: colors.card2,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 15,
      color: colors.text,
      marginBottom: 14,
    },

    pickerLabel: {
      color: colors.subText,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },

    categoryPill: {
      backgroundColor: colors.card2,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginRight: 8,
    },

    categoryPillActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },

    categoryPillText: {
      color: colors.subText,
      fontWeight: '700',
    },

    categoryPillTextActive: {
      color: '#070E1C',
    },

    formErrorBox: {
      backgroundColor: isDarkMode ? '#1A0E0E' : '#FEF3F2',
      borderWidth: 1,
      borderColor: colors.danger,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },

    formErrorText: {
      color: colors.danger,
      fontWeight: '700',
    },

    formSuccessBox: {
      backgroundColor: isDarkMode ? '#0E1A14' : '#ECFDF3',
      borderWidth: 1,
      borderColor: colors.success,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },

    formSuccessText: {
      color: colors.success,
      fontWeight: '700',
    },

    addButton: {
      backgroundColor: colors.gold,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },

    addButtonDisabled: {
      opacity: 0.5,
    },

    addButtonText: {
      color: '#070E1C',
      fontWeight: '900',
      fontSize: 15,
    },

    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },

    toggleRow: {
      flexDirection: 'row',
      backgroundColor: colors.card2,
      borderRadius: 20,
      padding: 4,
    },

    toggleBtn: {
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: 16,
    },

    toggleBtnActive: {
      backgroundColor: colors.gold,
    },

    toggleText: {
      color: colors.subText,
      fontWeight: '700',
      fontSize: 12,
    },

    toggleTextActive: {
      color: '#070E1C',
    },

    filterTab: {
      backgroundColor: colors.card2,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginRight: 8,
      marginBottom: 10,
    },

    filterTabActive: {
      backgroundColor: colors.gold,
      borderColor: colors.gold,
    },

    filterTabText: {
      color: colors.subText,
      fontWeight: '700',
    },

    filterTabTextActive: {
      color: '#070E1C',
    },

    emptyText: {
      color: colors.muted,
      textAlign: 'center',
      paddingVertical: 20,
    },

    expenseItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card2,
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },

    expenseCategoryDot: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    expenseDescription: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
    },

    expenseDate: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 3,
    },

    amountText: {
      color: colors.gold,
      fontSize: 15,
      fontWeight: '900',
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.55)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },

    modalCard: {
      backgroundColor: colors.card,
      borderRadius: 22,
      padding: 22,
      borderWidth: 1,
      borderColor: colors.border,
    },

    modalTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '900',
      marginBottom: 14,
    },

    modalInput: {
      backgroundColor: colors.card2,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      color: colors.text,
      marginBottom: 18,
    },

    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },

    modalCancel: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 14,
      backgroundColor: colors.card2,
    },

    modalCancelText: {
      color: colors.subText,
      fontWeight: '800',
    },

    modalSave: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 14,
      backgroundColor: colors.gold,
    },

    modalSaveText: {
      color: '#070E1C',
      fontWeight: '900',
    },

    footer: {
      alignItems: 'center',
      marginVertical: 20,
    },

    footerText: {
      color: colors.muted,
      fontSize: 11,
    },
  });
};

export const styles = getAppStyles(true);