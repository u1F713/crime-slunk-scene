---
title: Lorem ipsum
---

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam illum
molestiae doloribus accusantium saepe quod voluptatem impedit quibusdam
culpa quidem corrupti itaque nostrum recusandae, dicta repellendus iure magni.
Facere, quos?

```elisp filename=component.el
(defun cdl-get-file (filename)
  "Run file through ncdump and insert result into buffer after point."
  (interactive "fCDF file: ")
  (message "ncdump in progress...")
  (let ((start (point)))
    (call-process  "ncdump" nil t nil (expand-file-name filename))
    (goto-char start))
  (message "ncdump in progress...done"))

(defun cdl-put-region (filename start end)
  "Run region through ncgen and write results into a file."
  (interactive "FNew CDF file: \nr")
  (message "ncgen in progress...")
  (call-process-region start end "ncgen"
                       nil nil nil "-o" (expand-file-name filename))
  (message "ncgen in progress...done"))

(provide 'cdl)

```
