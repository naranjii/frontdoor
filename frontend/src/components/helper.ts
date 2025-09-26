  export const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-warning text-warning-foreground"
      case "processing":
        return "bg-primary text-primary-foreground"
      case "completed":
        return "bg-success text-success-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }