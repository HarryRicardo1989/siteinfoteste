import time


class SpeedTest:

    def speed(self, direction, device, time_step=0.5):
        path = "/sys/class/net/{}/statistics/{}_bytes".format(
            device, direction)
        with open(path, "r") as f:
            bytes_before = int(f.read())
        time.sleep(time_step)
        with open(path, "r") as f:
            bytes_after = int(f.read())
        return {self.__updown(direction): f'{round(((((bytes_after-bytes_before)/time_step)/1024)/1024),3)} MB/s'}

    def __updown(self, direction):
        if direction == "tx":
            return "---UpLINK---"
        elif direction == "rx":
            return "-DownLINK-"
