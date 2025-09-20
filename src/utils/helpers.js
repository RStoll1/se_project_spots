export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving"
) {
  btn.textContent = isLoading ? defaultText : loadingText;
}
