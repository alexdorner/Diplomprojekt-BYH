package Impl;

import FhirModel.Device;
import FhirModel.DeviceName;
import FhirModel.Reference;
import KisModel.ServiceUnit;
import mapper.DeviceMapper;

public class DeviceMapperImpl implements DeviceMapper {
    @Override
    public Device FromerviceUnitToDevice(ServiceUnit serviceUnit) {
        if (serviceUnit == null){
            return null;
        }

        Device device = new Device();
        DeviceName deviceName = new DeviceName();
        deviceName.setName(serviceUnit.getName());
        device.setDeviceName(deviceName);
        Reference reference = new Reference();
        reference.setType(serviceUnit.getDepartment());
        reference.setReference("http://192.189.51.8:8080/api/organization/" + serviceUnit.getDepartment());
        device.setOwner(reference);
        reference.setId(serviceUnit.getDepartment()+"_ref");
        deviceName.setId(serviceUnit.getName());
        device.setId(serviceUnit.getName());
        return device;
    }

    @Override
    public Device FromDeviceListToDevice(ServiceUnit serviceUnit) {
        if(serviceUnit == null){
            return null;
        }
        Device device = new Device();
        device.setId(serviceUnit.getName());
        return device;
    }
}

