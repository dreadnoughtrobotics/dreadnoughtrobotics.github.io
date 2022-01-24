import cv2

fname = "Team heads/Sai Chidambaram.jpeg"
path = f"../assets/img/{fname}"
im = cv2.imread(path)
print(path)
im2 = cv2.resize(im, (800, 800))
cv2.imwrite(path, im2)